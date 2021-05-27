# vite resolveConfig分析

------

本文旨在分析vite源码中解析config的函数resolveConfig。



### config来源

1. [inlineConfig](https://github.com/vitejs/vite/blob/b6d12f71c1dbd5562f25bc2c32c44eed32b27e94/packages/vite/src/node/cli.ts#L62)，来自于命令行或npm script。
2. [vite.config.*](https://cn.vitejs.dev/config/)，用户的配置文件。
3. [Plugin.config](https://cn.vitejs.dev/guide/api-plugin.html#config)，插件的config方法返回的配置选项。



### 涉及功能

1. 设置--configFile false 来禁用配置文件

2. 按需加载插件

3. 插件强制下顺序

4. 加载.env文件

5. plugin.config  钩子函数

6. plugin.configResolved钩子函数

   

### 流程

#### [入口](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L300)

```javascript
const config = await resolveConfig(inlineConfig, 'serve', 'development')  
```

#### [resolveConfig](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L223)

**函数参数**

```typescript
function resolveConfig(
  inlineConfig: InlineConfig,
  command: 'build' | 'serve',
  defaultMode = 'development'
): Promise<ResolvedConfig>
```

**设置config，mode，configFileDependencies变量**

```javascript
let config = inlineConfig// 存放配置
let configFileDependencies: string[] = []// 存放配置文件的依赖
let mode = inlineConfig.mode || defaultMode// 设置mode

if (mode === 'production') {
    process.env.NODE_ENV = 'production'
  }
  const configEnv = {
    mode,
    command
  }
```

  **加载配置文件，[重置配置mode，](https://cn.vitejs.dev/config/#mode)同时知道可以使用--configFile false 来禁用配置文件***

```javascript
  let { configFile } = config
  if (configFile !== false) {
    const loadResult = await loadConfigFromFile(...args)// 伪参数
    if (loadResult) {
      config = mergeConfig(loadResult.config, config)// 合并用户配置
      configFile = loadResult.path
      configFileDependencies = loadResult.dependencies// 获取配置文件的依赖
    }
  }
	//  根据用户配置，重置mode
	mode = config.mode || mode;
```

**[loadConfigFromFile](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L670)就是根据项目目录，获取相关的配置文件，需要的注意是，当使用配置文件类型是ts且使用es module时，会被esbuild转义读取，然后删除转义后的文件**

```javascript
function loadConfigFromFile(...args){
    //	...伪代码
    
    if (isMjs && isTS) {  
        const bundled = await bundleConfigFile(resolvedPath, true) //	转义
        dependencies = bundled.dependencies
        fs.writeFileSync(resolvedPath + '.js', bundled.code)     //	暂存读取
        userConfig = (await eval(`import(fileUrl + '.js?t=${Date.now()}')`))
            .default
        fs.unlinkSync(resolvedPath + '.js')  //	 删除临时文件
    } 
    
      //	...伪代码
}
```

**解析插件，[按需配置插件：plugin,apply](https://cn.vitejs.dev/guide/using-plugins.html#conditional-application)，[强制插件排序：plugin.enforce](https://cn.vitejs.dev/guide/using-plugins.html#enforcing-plugin-ordering)，执行[plugin.config钩子函数](https://cn.vitejs.dev/guide/api-plugin.html#config)，再次添加用户配置**

```typescript
	//  扁平数组，同时筛选应用在当前command下的插件
	const rawUserPlugins = config.plugins.flat().filter((p) => {
		return p && (!p.apply || p.apply === command);
	});
	//  sortUserPlugins方法根据插件的enforce参数进行排序
	const [prePlugins, normalPlugins, postPlugins] = sortUserPlugins(rawUserPlugins);
    //  执行plugin.config钩子函数，同时再次配置 
	const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins];
	for (const p of userPlugins) {
		if (p.config) {
			const res = await p.config(config, configEnv);
			if (res) {
				config = mergeConfig(config, res);
			}
		}
	}
```

**解析resolve参数：alias，dedupe，可以知道，alias，dedupe参数可以用于resolve同级。此处解析 /^\/@vite\//,是为了解析hmr的客户端文件路径。**

```typescript
 const resolvedAlias = mergeAlias(
    [{ find: /^\/@vite\//, replacement: () => CLIENT_DIR + '/' }],
    config.resolve?.alias || config.alias || []
  )

  const resolveOptions: ResolvedConfig['resolve'] = {
    dedupe: config.dedupe,
    ...config.resolve,
    alias: resolvedAlias
  }
```

**[加载.env文件配置用户环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)，[同时官网所说的区分pro/dev环境和模式也在此体现](https://cn.vitejs.dev/guide/env-and-mode.html#modes)，至此，用户总共有三次改变pro/dev环境和模式：1.命令行指定，2.配置文件，3.env文件 。同时可以知道，配置--enFile false  可以禁用.env，不过貌似没有这个命令。**

```typescript
  const userEnv = inlineConfig.envFile !== false && loadEnv(mode, resolvedRoot)
  const isProduction = (process.env.VITE_USER_NODE_ENV || mode) === 'production'
  if (isProduction) {
    process.env.NODE_ENV = 'production'
  }
```

**[loadEnv方法](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L894)就是根据mode 使用dotenv加载环境下的.env文件，[并判断' VITE_'前缀](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)，同时根据[用户配置的NODE_ENV](https://cn.vitejs.dev/guide/env-and-mode.html#modes)配置VITE_USER_NODE_ENV变量。**

```typescript
 function loadEnv(  mode: string, root: string,prefix = 'VITE_') {
     //	...伪代码
     
  for (const file of envFiles) {
      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith(prefix) && env[key] === undefined) {
          env[key] = value
        } else if (key === 'NODE_ENV') {
          process.env.VITE_USER_NODE_ENV = value
        }
      }
    }
     //	...伪代码
     
  }
  return env
}
```

**解析**[BASE_URL](https://cn.vitejs.dev/config/#base)，[buildOptions](https://cn.vitejs.dev/config/#build-options)，[cacheDir](https://cn.vitejs.dev/config/#cachedir)，[assetsFilter](https://cn.vitejs.dev/config/#assetsinclude)，[publicDir](https://cn.vitejs.dev/config/#publicdir)

```typescript
  const BASE_URL = resolveBaseUrl(config.base, command === 'build', logger)
  const resolvedBuildOptions = resolveBuildOptions(config.build)
  const pkgPath = lookupFile(
    resolvedRoot,
    [`package.json`],
    true /* pathOnly */
  )
  const cacheDir = config.cacheDir
    ? path.resolve(resolvedRoot, config.cacheDir)
    : pkgPath && path.join(path.dirname(pkgPath), `node_modules/.vite`)

  const assetsFilter = config.assetsInclude
    ? createFilter(config.assetsInclude)
    : () => false

  const { publicDir } = config
  const resolvedPublicDir =
    publicDir !== false && publicDir !== ''
      ? path.resolve(
          resolvedRoot,
          typeof publicDir === 'string' ? publicDir : 'public'
        )
      : ''
```

**添加内置插件，如css解析，ts解析等，[并对所有插件排序](https://cn.vitejs.dev/guide/api-plugin.html#handlehotupdate)**

```typescript
  (resolved.plugins as Plugin[]) = await resolvePlugins(
    resolved,
    prePlugins,
    normalPlugins,
    postPlugins
  )

function resolvePlugins(...args): Promise<Plugin[]> {
 //	...伪代码
    
  return [
    isBuild ? null : preAliasPlugin(),
    aliasPlugin({ entries: config.resolve.alias }),
    ...prePlugins,
    dynamicImportPolyfillPlugin(config),
    resolvePlugin({
      ...config.resolve,
      root: config.root,
      isProduction: config.isProduction,
      isBuild,
      ssrTarget: config.ssr?.target,
      asSrc: true
    }),
    htmlInlineScriptProxyPlugin(),
    cssPlugin(config),
    config.esbuild !== false ? esbuildPlugin(config.esbuild) : null,
    jsonPlugin(
      {
        namedExports: true,
        ...config.json
      },
      isBuild
    ),
    wasmPlugin(config),
    webWorkerPlugin(config),
    assetPlugin(config),
    ...normalPlugins,
    definePlugin(config),
    cssPostPlugin(config),
    ...buildPlugins.pre,
    ...postPlugins,
    ...buildPlugins.post,
    // internal server-only plugins are always applied after everything else
    ...(isBuild
      ? []
      : [clientInjectionsPlugin(config), importAnalysisPlugin(config)])
  ].filter(Boolean) as Plugin[]
}

 
```

**createResolver，创建一个内部使用的插件解析器，执行所有的插件**

```typescript
const createResolver: ResolvedConfig['createResolver'] = (options) => {
    return async (id, importer, aliasOnly) => {
      let container: PluginContainer
      	// ...伪代码 创建container
      }
      return (await container.resolveId(id, importer))?.id
    }
  }
```

[**执行钩子函数plugin.configResolved**](https://cn.vitejs.dev/guide/api-plugin.html#configresolved)

```typescript

  await Promise.all(userPlugins.map((p) => p.configResolved?.(resolved)))

```

**汇总resolved，在这里，有[用户env中额外的数据](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables)**

```typescript
  const resolved: ResolvedConfig = {
    ...config,
    configFile: configFile ? normalizePath(configFile) : undefined,
    configFileDependencies,
    inlineConfig,
    root: resolvedRoot,
    base: BASE_URL,
    resolve: resolveOptions,
    publicDir: resolvedPublicDir,
    cacheDir,
    command,
    mode,
    isProduction,
    plugins: userPlugins,
    server: resolveServerOptions(resolvedRoot, config.server),
    build: resolvedBuildOptions,
     // 添加额外的env参数
    env: {
      ...userEnv,
      BASE_URL,
      MODE: mode,
      DEV: !isProduction,
      PROD: isProduction
    },
    assetsInclude(file: string) {
      return DEFAULT_ASSETS_RE.test(file) || assetsFilter(file)
    },
    logger,
    createResolver,
    optimizeDeps: {
      ...config.optimizeDeps,
      esbuildOptions: {
        keepNames: config.optimizeDeps?.keepNames,
        ...config.optimizeDeps?.esbuildOptions
      }
    }
  }
```

