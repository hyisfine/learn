# vite依赖预构建功能分析

------

**本文旨在分析vite中的依赖预构建功能，并附加相关功能的代码地址和官网地址。**



### [依赖预构建](https://cn.vitejs.dev/guide/dep-pre-bundling.html)主要流程

1. 在开启server之前进行依赖预构建。

2. 读取用户的package-lock.json，yarn.lock，pnpm-lock.yaml，生成depHash。

3. 读取上次[文件缓存的预构建文件](https://cn.vitejs.dev/guide/dep-pre-bundling.html#file-system-cache)信息，如果有，则将获取到的hash和上一步的depHash进行比较，一样则返回，否则重新构建。没有缓存或[设置force参数，](https://cn.vitejs.dev/guide/dep-pre-bundling.html#file-system-cache)则重新构建。

4. 利用esbuild，对项目文件进行扫描，获取到项目依赖。

5. 利用esbuild，[将项目依赖的模块化方式转化成es module方式](https://cn.vitejs.dev/guide/features.html#npm-dependency-resolving-and-pre-bundling)。

6. 将转换的模块[存入cacheDir](https://cn.vitejs.dev/config/#cachedir)（[默认是node_module/.vite)](https://cn.vitejs.dev/guide/dep-pre-bundling.html#file-system-cache)。

7. 前端请求资源时，判断请求资源是否为依赖（即bare import），如果是则替换为缓存文件路径，加载相应文件。

8. 启动服务后，[每当引入新的依赖，则重新进行依赖构建。](https://cn.vitejs.dev/guide/dep-pre-bundling.html#automatic-dependency-discovery)执行2，3，4，5过程。

    

### 源码分析

#### **[**构建开始代码入口**](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L544)**

**如果不是中间件模式，则在server启动前，首先执行[plugin.buildStart钩子函数](https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks)，再执行构建函数。否则直接执行，此处的container是一个plugin的集合体，按运行顺序依次执行相关钩子函数。**

```typescript
  if (!middlewareMode && httpServer) {
    const listen = httpServer.listen.bind(httpServer)
    //	重写listen，确保server启动之前执行。
    httpServer.listen = (async (port, ...args) => {
      try {
          // container plugin集合体
        await container.buildStart({})//	plugin.buildStart
        await runOptimize() //	预构建
      } catch (e) {}
      return listen(port, ...args)
    })   
  } else {
    await container.buildStart({})
    await runOptimize()
  }
```

#### [runOptimize函数](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L532)

**_isRunningOptimizer添加构建状态，optimizeDeps函数返回构建过程3，4，5步中返回的预构建信息，_registerMissingImport返回一个预构建函数可以随时进行预构建，当运行的服务中有新的依赖引入时重新构建，同时_isRunningOptimizer状态可以有效避免构建时的数据请求。**

```typescript
  const runOptimize = async () => {
    if (config.cacheDir) {
      server._isRunningOptimizer = true
      try {
        server._optimizeDepsMetadata = await optimizeDeps(config)
      } finally {
        server._isRunningOptimizer = false
      }
      server._registerMissingImport = createMissingImporterRegisterFn(server)
    }
  }
```

#### [**optimizeDeps函数**](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/optimizer/index.ts#L102)

**optimizeDeps是主要的函数，做以下事情**

1. 获取前次预构建信息，对此次信息进行比较，决定是否重新构建。

2. 扫描源码，或根据参数，获取依赖。

3. 利用`es-module-lexer`扁平化嵌套的源码依赖。

4. 解析[用户依赖优化配置](https://cn.vitejs.dev/config/#dep-optimization-options)，调用esbuild构建文件，并存入cacheDir。

5. 存放此次构建信息并返回

    ```typescript
    function optimizeDeps( config, force=config.server.force,asCommand=false,newDeps?) {
      // 	...
        
      const dataPath = path.join(cacheDir, '_metadata.json')
      //	生成此次构建hash
      const mainHash = getDepHash(root, config)
      const data: DepOptimizationMetadata = {
        hash: mainHash,
        browserHash: mainHash,
        optimized: {}
      }
      //	用户的force参数决定是否每次都重新构建  
      if (!force) {
        let prevData
        try {
    	  //	加载上次构建信息
          prevData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
        } catch (e) {}
         //		前后比对hash，相同则直接返回
        if (prevData && prevData.hash === data.hash) {
          return prevData
        }
      }
        
          // 	...
    
       // newDeps参数是在服务启动后加入依赖时传入的依赖信息。
      let deps
      if (!newDeps) {
         //	借助esbuild扫描源码，获取依赖
        ;({ deps, missing } = await scanImports(config))
      } else {
        deps = newDeps
        missing = {}
      }
    
      // 	...
    
      const include = config.optimizeDeps?.include
      if (include) {
         // 	...加入用户指定的include
      }
        
       // 扁平化依赖
      await init
      for (const id in deps) {
          flatIdDeps[id]=//...
        // 	...
      }
        
      // 	...
    
      // 	...加入用户指定的esbuildOptions
      const { plugins = [], ...esbuildOptions } =
        config.optimizeDeps?.esbuildOptions ?? {}
    
      //	调用esbuild.build打包文件
      const result = await build({
         //	...
        entryPoints: Object.keys(flatIdDeps),// 入口
        format: 'esm',// 打包成esm模式
        external: config.optimizeDeps?.exclude,// 剔除exclude文件
        outdir: cacheDir,// 输出地址
         // ...
      })
      
      //  重新写入_metadata.json
      for (const id in deps) {
        const entry = deps[id]
        data.optimized[id] = {
          file: normalizePath(path.resolve(cacheDir, flattenId(id) + '.js')),
          src: entry,
        }
      }
    
      writeFile(dataPath, JSON.stringify(data, null, 2))
    
      return data
    }
    ```

    

#### **前端获取依赖时替换成缓存的依赖**

**过程：访问有引入依赖的文件时，匹配依赖名称，返回cacheDir下的依赖路径。**

1. 解析config时在[plugins中引入preAliasPlugin插件](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/index.ts#L31)
2. 匹配依赖名字，返回添加缓存路径的名字

**plugin.resolveId的作用是，如果返回一个值，则会替换源码中的依赖，否则将名字传递给下一个插件处理，这里当匹配到依赖名字后，通过返回tryOptimizedResolve函数修改源码中的依赖名字。此时打开浏览器devtool，可以看到文件里的react路径变成了/node_modules/.vite/react.js?v=7db446d6**

```typescript
const bareImportRE = /^[\w@](?!.*:\/\/)/   // 匹配依赖
function preAliasPlugin() {
  let server: ViteDevServer
  return {
    name: 'vite:pre-alias',
    configureServer(_server) {
      server = _server
    },
    resolveId(id, _, __, ssr) {
        // 判断是依赖，则添加缓存路径
      if (!ssr && bareImportRE.test(id)) {
        return tryOptimizedResolve(id, server)
      }
    }
  }
}

function tryOptimizedResolve(
  id: string,
  server: ViteDevServer
): string | undefined {
  const cacheDir = server.config.cacheDir
  const depData = server._optimizeDepsMetadata  // 依赖预构建中生成的构建信息
  if (cacheDir && depData) {
    const isOptimized = depData.optimized[id] // 查找是否存在依赖
    if (isOptimized) {
      return (	// 返回新的依赖路径
        isOptimized.file +
        `?v=${depData.browserHash}${
          isOptimized.needsInterop ? `&es-interop` : ``
        }`
      )
    }
  }
}

```

#### **运行服务时检测新增依赖重新构建**

**此处的代码太散乱，大致流程是：请求新依赖资源后，躲过了preAliasPlugin的匹配，依赖名称传递到[resolvePlugin插件](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/resolve.ts#L66)中，判断[引入依赖的文件是否也为依赖](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/resolve.ts#L138)，如果是则重新构建。**

