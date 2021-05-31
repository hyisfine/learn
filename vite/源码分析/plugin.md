# vite plugin插件模块分析

------

**本文旨在分析vite plugin模块。plugin是vite 的核心功能，通过plugin实现了预构建资源路径替换、解析alias、转译js、转译css、注入define、注入hmr辅助代码等功能。**



> **[Vite 可以使用插件进行扩展，这得益于 Rollup 优秀的插件接口设计和一部分 Vite 独有的额外选项。这意味着 Vite 用户可以利用 Rollup 插件的强大生态系统，同时根据需要也能够扩展开发服务器和 SSR 功能。](https://cn.vitejs.dev/guide/using-plugins.html)**



### 你将知道

1. plugin的各个hook函数的作用。

2. vite独有的hook函数的执行时期。

3. 内置的插件如何使vite对各种文件开箱即用。

4. 所有插件集中之后的各个hook函数的使用流程。

    

**vite插件基于[rollup插件](https://rollupjs.org/guide/en/#plugin-development)，插件的hook函数返回值和参数类型完全依照rollup，但并没有全部接受rollup的hook函数。目前只[使用了7个hook函数](https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks)。hook的参数与返回值可以从rollup官网获取到。同时vite提供了[5个独有的hook函数](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)。**



### rollup的hook分四个类型

1. async: 处理promise的异步钩子。

2. first: 如果多个插件实现了相同的钩子函数，那么会串式执行，从头到尾，但是，如果其中某个的返回值不是null也不是undefined的话，会直接终止掉后续插件。

3. sequential: 如果多个插件实现了相同的钩子函数，那么会串式执行，按照使用插件的顺序从头到尾执行，如果是异步的，会等待之前处理完毕，在执行下一个插件。

4. parallel: 同上，不过如果某个插件是异步的，其后的插件不会等待，而是并行执行。

    

### 一个完整的插件例子

**插件就是一个实现了各个hook的对象。按照hook使用顺序如下排列：**

```typescript
const myPlugin = {
    name: 'my-plugin', //  必须的插件标志
    apply: 'build' | 'serve', //  表明此插件应用在何种模式
    enforce: 'post' | 'pre', //  插件排序

    // rollup通用插件，ctx是一个plugins集合的上下文
    options(ctx,pluginOptions) {
      //  返回plugin opthons ，类型：async, sequential
      return somePluginOptions
    },
    buildStart(ctx,pluginOptions) {
      //  在服务启动前开始执行，类型：async, parallel
      //  ...do something
    },
    resolveId(ctx,srouce, importer, pluginOptions) {
      //  srouce为资源的路径，importer为引入此资源的文件
      //  如果有返回值，则将替换掉importer中引入的路径，同时将返回值传递给其他hook
      //  类型 async, first
      //  ...do something
      return srouce
    },
    load(ctx,id, srr) {
      //  id为resolveId返回的值
      //  加载资源并返回 类型 async, first
      //  ...do something
      return code
    },
    transform(ctx,code, id, ssr) {
      //  code为load返回的值，id为resolveId返回的值
      //  转译code并返回转译结果 类型 async, first，
      //  ...do something
      return transformCode
    },
    buildEnd(err) {
      //  构建结束的回调，可以捕获错误。类型 async, parallel
    },
    closeBundle() {
      //  构建结束的最终回调，类型 async, parallel
    },

    //  vite 独有插件
    config(config, env) {
      //  返回一个配置对象，merge到最终config中
      //  类型 sync, sequential
      return config
    },
    configResolved(config) {
      //  解析 Vite 配置后调用 类型 sync, parallel
    },
    configureServer(server) {
      //  服务器配置完后的hook 类型 sync, paralle
    },
    transformIndexHtml() {
      // 转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文
      // 类型 async, sequential
    },
    handleHotUpdate(HmrContext) {
      //  触发热更新时的hook，可以更加精确的控制hmr
      //  类型
    }
  }
```



### 源码分析

#### 解析插件入口

**插件的解析步骤发生在[resolveConfig](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L223)过程中，在我的[第一篇vite源码分析](https://juejin.cn/post/6966992960185434120)里有提过，现在着重讲解plugin的解析：**

```typescript
async function resolveConfig(inlineConfig, ...args) {
	let config = inlineConfig; // 配置参数对象

	//  ...伪代码

	//  首先扁平化plugins数组，所以你的plugin配置这样写也是可以的😂：[[pulginA,pulginB],pulginC]
	//  筛选应用apply设置应用场景(serve|build)的插件
	const rawUserPlugins = (config.plugins || []).flat().filter((p) => {
		return p && (!p.apply || p.apply === command);
	});

	//  sortUserPlugins函数根据enforce字段对插件进行排序，不再讲解
	//  源码：https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L652
	const [prePlugins, normalPlugins, postPlugins] = sortUserPlugins(rawUserPlugins);

	//  执行plugin.config hook,可再次设置配置参数
	//  mergeConfig函数合并参数，不再讲解，源码：https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/config.ts#L573
	const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins];
	for (const p of userPlugins) {
		if (p.config) {
			const res = await p.config(config, configEnv);
			if (res) {
				config = mergeConfig(config, res);
			}
		}
	}

	//  利用createPluginContainer函数创建一个用于特殊场景的内部解析器，比如解析css @import ，预构建依赖等
	//  createPluginContainer往下会讲解，源码：https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/pluginContainer.ts#L121
	const createResolver = (options) => {
		return async (id, importer, aliasOnly) => {
			let container = await createPluginContainer(...args);
			return (await container.resolveId(id, importer))?.id;
		};
	};

	//  最终参数配置对象
	const resolved = {
		//  ...其他配置
		plugins: userPlugins,
		createResolver,
	};

	//  resolvePlugins函数添加vite内部插件，使完成各功能开箱即用。
	//  resolvePlugins函数往下会讲解，源码：https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/index.ts#L18
	resolved.plugins = await resolvePlugins(resolved, prePlugins, normalPlugins, postPlugins);

	//  执行plugin.configResolved hook
	await Promise.all(userPlugins.map((p) => p.configResolved?.(resolved)));

	//  ...伪代码
}

```

#### [resolvePlugins](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/index.ts#L18)

**加入的内置插件基本对[应官网所提供的功能](https://cn.vitejs.dev/guide/features.html)**

```typescript
async function resolvePlugins(config, prePlugins, normalPlugins, postPlugins) {
	const isBuild = config.command === 'build';

    // 加载build相关插件
	const buildPlugins = isBuild
		? (await import('../build')).resolveBuildPlugins(config)
		: { pre: [], post: [] };

	return [
        //  在我的第二篇源码分析提到过此插件，作用是拦截已经预构建后的依赖名称，并返回修改后的名称，详情可看我的第二篇文章。
        isBuild ? null : preAliasPlugin(),
		aliasPlugin({ entries: config.resolve.alias }),//	别名解析
		...prePlugins,//    plugin.enforce=pre的用户插件
		dynamicImportPolyfillPlugin(config),//  插入动态导入polyfill
		resolvePlugin(...args),//   解析各资源的路径
		htmlInlineScriptProxyPlugin(),//    
		cssPlugin(config),//    解析css
		config.esbuild !== false ? esbuildPlugin(config.esbuild) : null,//  用户配置的esbuild插件
		jsonPlugin(...args),//  解析json
		wasmPlugin(config),//   解析Web Assembly
		webWorkerPlugin(config),//  解析web worker
		assetPlugin(config),//  解析静态资源
		...normalPlugins,// 用户插件
		definePlugin(config),// 解析全局常量
		cssPostPlugin(config),//    解析css post
		...buildPlugins.pre,//  
		...postPlugins,
        ...buildPlugins.post,
        //  热更新客户端资源插入和import 分析，如import.meta.glob，import.meta.hot等
		...(isBuild ? [] : [clientInjectionsPlugin(config), importAnalysisPlugin(config)]),
	].filter(Boolean)
}

```

#### [createPluginContainer](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/pluginContainer.ts#L121)

**此函数就是将所有的插件的hook函数集中起来统一执行处理，并根据hook类型决定如何返回值。**

```typescript
export async function createPluginContainer({ plugins, rollupOptions }: ResolvedConfig) {
	// ...伪代码

	//  plugins的上下文
	class Context implements PluginContext {}

	//  transform hooks的上下文
	class TransformContext extends Context {}

	const container = {
        //	注意，options是一个立即调用函数，你的插件的options hook可以直接是配置对象，也可以是返回配置对象的函数
		options: await (async () => {
			for (const plugin of plugins) {
				if (!plugin.options) continue;
				options = (await plugin.options(...args)) || options;
			}
		})(),

		async buildStart() {
			await Promise.all(
				plugins.map((plugin) => {
					if (plugin.buildStart) {
						return plugin.buildStart.call(new Context(plugin), ...args);
					}
				}),
			);
		},

		async resolveId(...args) {
			const ctx = new Context();
			for (const plugin of plugins) {
				if (!plugin.resolveId) continue;
				const result = await plugin.resolveId.call(ctx, ...args);
				if (!result) continue;
			}
		},

		async load(...args) {
			for (const plugin of plugins) {
				if (!plugin.load) continue;
				const result = await plugin.load.call(ctx, ...args);
			}
		},

		async transform(...args) {
			const ctx = new TransformContext(...args);
			for (const plugin of plugins) {
				result = await plugin.transform.call(ctx, ...args);
			}
		},

		watchChange(...args) {
			const ctx = new Context();
			for (const plugin of plugins) {
				if (!plugin.watchChange) continue;
				plugin.watchChange.call(ctx,...args);
			}
		},

		async close() {
			if (closed) return;
			const ctx = new Context();
			await Promise.all(plugins.map((p) => p.buildEnd && p.buildEnd.call(ctx)));
			await Promise.all(plugins.map((p) => p.closeBundle && p.closeBundle.call(ctx)));
			closed = true;
		},
	};

	return container;
}

```

### 其余vite 独有hook执行地点

#### configureServer

**configureServer hook在[配置server参数结束](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L433)后执行。**

```typescript
 async function resolveConfig(...args){
    
    // ...伪代码
    // ...配置server

    const postHooks: ((() => void) | void)[] = []
    for (const plugin of plugins) {
      if (plugin.configureServer) {
        postHooks.push(await plugin.configureServer(server))
      }
    }
}
```

#### tansformIndexHtml

**tansformIndexHtml hook在转换index.html时使用，这里只给出[源码位置](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/plugins/html.ts#L454)。**

#### handleHotUpdate

**热更新时触发的hook，可以更精确地控制hmr行为。触发点在[监听文件变动](https://github.com/vitejs/vite/blob/5745a2e8072cb92d647662dc387e7f12b2841cab/packages/vite/src/node/server/index.ts#L408)时。**

```typescript
 async function createServer(...args){
    
    // ...伪代码
    // ...配置server

   //	watcher，文件监听对象
  watcher.on('change', async (file) => {
    // ...伪代码
    if (serverConfig.hmr !== false) {
      	await handleHMRUpdate(file, server)
    }
  })
}
```

### 插件使用流程

**客户端请求服务器资源后，在返回资源过程中，将资源的名称、内容等信息传入由createPluginContainer创建的plugins集合中，执行相关hook，再返回给客户端。**

