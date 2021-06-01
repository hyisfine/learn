# vite hmr原理分析

**本文旨在分析vite hmr的实现原理，并附上相关官方源码地址和官网地址。**



**hmr有两种解释，一种是hot module refresh，模块热更新，指的是监听文件的变化，重新编译文件然后告诉前端刷新整个页面。另一种就是我们今天说的hot module replacement，模块热替换，指的是监听文件的变化，重新编译文件，告诉前端更新的文件，重新加载此文件。**



### 实现原理

**Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式服务源码，只需要在浏览器请求源码时先进行转换再返回转换后的源码。基于这种方式，vite hmr的实现要比webpack的hrm实现更简单更快速。**

**大致过程是：**

1. 创建一个websocket服务端。
2. 创建一个ws client文件，并在html中引入，加载ws client文件。
3. 服务端监听文件变化，发送websocket消息，告诉客户端变化类型，变化文件等。
4. 客户端接受到消息，根据消息内容决定重新刷新页面还是重新加载变化文件，并执行相关文件注入ws client时设置的hmr hook函数。



### 源码分析

#### 创建一个websocket服务端。

**[在createServer函数内调用createWebSocketServer，](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L313)在[createWebSocketServer](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/ws.ts#L18)中调用[`ws`](https://github.com/websockets/ws)库创建ws服务端。**

```typescript
import WebSocket from 'ws';
function createWebSocketServer(server, config, httpsOptions?) {
	//  ...

	let wss;
	const hmr = typeof config.server.hmr === 'object' && config.server.hmr;
	const wsServer = (hmr && hmr.server) || server;

	//  创建WebSocket服务，noServer开启无服务器模式
	wss = new WebSocket.Server({ noServer: true });
	wsServer.on('upgrade', (req, socket, head) => {
		wss.handleUpgrade(req, socket, head, (ws) => {
			wss.emit('connection', ws, req);
		});
	});

	//  ...

	return {
		send(payload) {
			// 发送客户端消息
			const stringified = JSON.stringify(payload);
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(stringified);
				}
			});
		},

		close() {
			return new Promise((resolve, reject) => {
				// 关闭服务
				wss.close((err) => {
					//  ...
				});
			});
		},
	};
}

```

#### 创建一个ws client文件，并在html中引入，加载ws client文件。

**vite的websocket客户端[源码在这里](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts)。在处理index.html文件时，把对ws client的引入注入到index.html文件中。浏览器访问index.htm就会加载ws client文件并执行，创建客户端ws，接收ws服务端信息。**

**过程如下：**

1. 处理index.html时，在执行vite 独有hook `transformIndexHtml`时把'<script type="module" src="/@vite/client"></script>'注入到文件中。[（源码地址）](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/middlewares/indexHtml.ts#L134)

2. 在[参数分析章节](https://juejin.cn/post/6966992960185434120)中讲过，在解析alias别名参数时，vite内部[额外添加了解析 /@vite 别名的配置](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L296)，并将其指引到当前项目的node_module/vite/dist/client/下。所有当加载/@vite/client时，实际返回的是node_module/vite/dist/client/client.js。

3. 在[插件分析章节](https://juejin.cn/post/6968369185428602893)提过，vite内部加入的插件中，clientInjectionsPlugin插件是专门解析ws client文件的，作用就是[直接替换掉ws client文件里创建ws 客户端所需要的变量](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/clientInjections.ts#L43)。

4. 在ws client 文件中，[通过Websocket创建ws客户端](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L19)，并接受服务端信息。

    ```typescript
    //	client.js
    
    //	socketProtocol socketHost由clientInjectionsPlugin插件替换
    //	创建ws客户端
    const socket = new WebSocket(`${socketProtocol}://${socketHost}`, 'vite-hmr')
    const base = __BASE__ || '/'
    
    //	接受服务端信息
    socket.addEventListener('message', async ({ data }) => {
      handleMessage(JSON.parse(data))
    })
    
    ```

**查看自己本地运行的vite项目，查看页面源码和client文件即可验证。**

#### 服务端监听文件变化，发送websocket消息，告诉客户端变化类型，变化文件等。

**vite 使用`chokidar`来监听文件 ，[源码入口：](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L316)**

```typescript
  const watcher = chokidar.watch(root,...args);
  watcher.on('change', async (file) => {
    if (serverConfig.hmr !== false) {
        await handleHMRUpdate(file, server)
    }
  })
  watcher.on('add', (file) => {
    handleFileAddUnlink(...args)
  })
  watcher.on('unlink', (file) => {
    handleFileAddUnlink(...args)
  })

```

**[handleHMRUpdate函数](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/hmr.ts#L40)会发送消息给客户端，根据此次修改文件的类型告诉客户端是要刷新还是重新加载文件。**

```typescript
function handleHMRUpdate(...args){
   //	... 伪代码
   //	... 判断hmr 类型
    
    	
   //	执行plugin.handleHotUpdate hook
  for (const plugin of config.plugins) {
    if (plugin.handleHotUpdate) {
    //	...
    }
  }
    
    //	发送客户端消息
   ws.send({
      type: 'update'|'full-reload',
      path:'',// 文件修改路径
      updates:{}//	此次更新信息
   })
}
```

#### 客户端接受到消息，根据消息内容决定重新刷新页面还是重新加载变化文件，并执行相关文件注入ws client时设置的hmr hook函数。

**客户端接收到消息后，根据消息[区分是刷新页面还是重新加载文件](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L40)，加载文件的话是[加载css类型还是js类型文件。](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L60)如果是css，则根据返回的path直接重新加载.**

```typescript
let { path, timestamp } = update
 path = path.replace(/\?.*/, '')

//	根据path搜索link标签
//	重新设置link.href，重新加载
//	添加t=${timestamp}是为了避免加载浏览器缓存
const el = (
    [].slice.call(
        document.querySelectorAll(`link`)
    )
).find((e) => e.href.includes(path))
if (el) {
    const newPath = `${path}${
    path.includes('?') ? '&' : '?'
    }t=${timestamp}`
    el.href = new URL(newPath, el.href).href
}
```

**[如果是js类型文件](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L61)，则会[先重新加载文件](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L291)，然后[执行在当前js文件类注册的hmr hook](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/client/client.ts#L164)。**

```typescript
// client.js 
if (update.type === 'js-update') {
     queueUpdate(fetchUpdate(update))
 }


// fetchUpdate 重新加载文件
function fetchUpdate(update){
    // ... 
    const {base,path,timestamp,query}=update
    const newMod = await import(base +path.slice(1) +`?import&t=${timestamp}${query ? `&${query}` : ''}`)
     
     //	...
}


//	queueUpdate 执行hmr hook 回调
function queueUpdate(){
      // ... 
     ;(await Promise.all(loading)).forEach((fn) => fn && fn())
      // ... 
}


```



### 最后

**ws client文件没有详细讲解，主要是讲个大体思路。**