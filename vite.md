# vite 源码学习笔记

---

### 官网笔记

1. Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类。
2. Vite 将会使用 `esbuild` 预构建依赖。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。文件系统缓存&浏览器缓存
3. Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。
4. 源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存.
5. 预构建-检测裸模块导入-CommonJS / UMD 转换为 ESM 格式-重写 url
6. 所有框架语法开箱即用，css 类框架需下载各自解析器
7. Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块
8. 异步 chunk 会保证只在 CSS 加载完毕后再执行，避免发生 FOUC 。
9. 预加载modulereload
10. 异步 Chunk 加载优化，加载chunk同时加载chunk依赖
11. 使用.env文件存放环境变量
12. falsy 值 (虚值) 
13. 区分环境-模式 ，借助.env添加环境变量。（server-production总算可以实现了）

### 源码笔记

#### 知识点

1. vite 以 monorepo 方式管理所有项目，所用 package.json 字段，workspaces

2. [npm：file](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)，[yarn：link](https://github.com/npm/npm/pull/15900) 方式安装本地包

    

#### 涉及 npm 包

1. source-map-support 产生源码 map，

2. inspector [代码调试](https://www.jianshu.com/p/16fb914086f9)

3. cac 构建 cli 选项处理的库

4. dotenv 处理.env 文件并写入 process.env

5. run-p 并行处理 npm script 命令

6. rimraf 移除文件

7. run-s 顺序处理 npm script 命令

8. rollup 打包工具

9. api-extractor ts 分析工具

10. conventional-changelog commit 日志处理

11. tsc ts 编译工具

12. connect 中间件服务

13. cors 中间件 cors

14. chokidar 文件监听



#### node相关

1.  require('url').pathToFileURL

2. process.stdout

3. process.stdin

4. readline.cursorTo  readline.clearScreenDown 

5. process.stdout.isTTY process.env.CI

     

#### 未发布功能

1. ServerOptions.middlewareMode 将vite服务作为中间件

2. 

    

#### 编译结果 js

1. void 0
2. HTMLLinkElement
3. modulepreload

编译结果：

```javascript
//  entry js
    const l={} // 存放所有引入js

    //  方法 动态引入js，且实现： https://cn.vitejs.dev/guide/features.html#build-optimizations
    //  1.该异步 chunk 会保证只在 CSS 加载完毕后再执行，避免发生 FOUC 。
    //  2.预加载指令生成，自动生成 <link rel="modulepreload"> 指令
    //  3.异步 Chunk 加载优化，异步依赖chunk同时下载


    const a = function (e, t) {
		if (!t) return e();
		if (void 0 === n) {
			const e = document.createElement('link').relList;
			n = e && e.supports && e.supports('modulepreload') ? 'modulepreload' : 'preload';
		}
		return Promise.all(
			t.map((e) => {
				if (e in l) return;
				l[e] = !0;
				const t = e.endsWith('.css'),
					r = t ? '[rel="stylesheet"]' : '';
				if (document.querySelector(`link[href="${e}"]${r}`)) return;
				const a = document.createElement('link');
				return (
					(a.rel = t ? 'stylesheet' : n),
					t || ((a.as = 'script'), (a.crossOrigin = '')),
					(a.href = e),
					document.head.appendChild(a),
					t
						? new Promise((e, t) => {
								a.addEventListener('load', e), a.addEventListener('error', t);
						  })
						: void 0
				);
			}),
		).then(() => e());
	};

a(() => import('./dy.1d0aef29.js'), [
	'/assets/dy.1d0aef29.js',
	'/assets/dy.492d24df.js',
	'/assets/dy.ed2055bd.css',
]),

```

#### vite 流程



##### dev 使用 tsc 转义 ts，build 使用 rollup 打包



###### 	server流程  

 `createServer`入口函数,`middlewareMode`vite 中间件模式，`resolveHttpServer`创建 http，`createWebSocketServer`创建 ws 服务，用于 hmr,`chokidar`文件监听，创建 watcher，`createPluginContainer`创建集装箱，即插件



###### resolveConfig

**加载config-file**

```javascript
if (configFile !== false) {
  // loadConfigFromFile：检查package.json.type=='module'，
  // 检查配置文件是否为ts，如果是则由esbuild转化，其余文件格式则正常引入
    const loadResult = await loadConfigFromFile(
      configEnv,
      configFile,
      config.root,
      config.logLevel
    )
    if (loadResult) {
      config = mergeConfig(loadResult.config, config)
      configFile = loadResult.path
      configFileDependencies = loadResult.dependencies
    }
  }	
```

**解析plugins**

```javascript
  const rawUserPlugins = (config.plugins || []).flat().filter((p) => {
    // 解析apply参数，指定插件的作用模式
    return p && (!p.apply || p.apply === command)
  }) as Plugin[]
		//	sortUserPlugins 函数解析参数enforce，重置插件作用顺序
  const [prePlugins, normalPlugins, postPlugins] = sortUserPlugins(
    rawUserPlugins
  )

  const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins]
  for (const p of userPlugins) {
    if (p.config) {  // vite插件独有钩子函数config，再次合并配置
      const res = await p.config(config, configEnv)
      if (res) {
        config = mergeConfig(config, res)
      }
    }
  }
```

**解析env，再次重置mode**

```javascript
  const userEnv = inlineConfig.envFile !== false && loadEnv(mode, resolvedRoot)
  const isProduction = (process.env.VITE_USER_NODE_ENV || mode) === 'production'
  if (isProduction) {
    process.env.NODE_ENV = 'production'
  }
```



