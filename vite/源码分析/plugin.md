# vite plugin插件应用分析

------

**本文旨在分析vite plugin的应用。plugin是vite 的核心功能，通过plugin实现了预构建资源路径替换、解析alias、转译js、转译css、注入define、注入hmr辅助代码等功能。**



> **[Vite 可以使用插件进行扩展，这得益于 Rollup 优秀的插件接口设计和一部分 Vite 独有的额外选项。这意味着 Vite 用户可以利用 Rollup 插件的强大生态系统，同时根据需要也能够扩展开发服务器和 SSR 功能。](https://cn.vitejs.dev/guide/using-plugins.html)**



### 你将知道

1. plugin的各个hook函数的作用。

2. vite独有的hook函数的执行时期。

3. 内置的插件如何使vite对各种文件开箱即用。

4. 所有插件集中之后的各个hook函数的使用流程。

    

**vite插件基于[rollup插件](https://rollupjs.org/guide/en/#plugin-development)，插件的hook函数返回值和参数类型完全依照rollup，但并没有全部接受rollup的hook函数。目前只有[使用了7个hook函数](https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks)。hook的参数与返回值可以rollup官网获取到。同时vite提供了[5个独有的hook函数](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)。**



##### **rollup的hook分四个类型**

1. async: 处理promise的异步钩子。

2. first: 如果多个插件实现了相同的钩子函数，那么会串式执行，从头到尾，但是，如果其中某个的返回值不是null也不是undefined的话，会直接终止掉后续插件。

3. sequential: 如果多个插件实现了相同的钩子函数，那么会串式执行，按照使用插件的顺序从头到尾执行，如果是异步的，会等待之前处理完毕，在执行下一个插件。

4. parallel: 同上，不过如果某个插件是异步的，其后的插件不会等待，而是并行执行。

    

##### 一个完整的插件例子

插件就是一个实现了各个hook的对象

```typescript
const myPlugin = {
    name: 'my-plugin', //  必须的插件标示，
    apply: 'build' | 'serve', //  表明此插件应用在何种模式,
    enforce: 'post' | 'pre', //  插件排序

    // rollup通用插件
    options(pluginOptions) {
      //  返回plugin opthons ，类型：async, sequential
      return somePluginOptions
    },
    buildStart(pluginOptions) {
      //  在服务启动前开始执行，类型：async, parallel
      //  ...do something
    },
    resolveId(srouce, importer, pluginOptions) {
      //  srouce为资源的路径，importer为引入此资源的文件
      //  如果有返回值，则将替换掉importer中引入的路径，同时将返回值传递给其他hook
      //  类型 async, first
      //  ...do something
      return srouce
    },
    load(id, srr) {
      //  id为resolveId返回的值
      //  加载资源并返回 类型 async, first
      //  ...do something
      return code
    },
    transform(code, id, ssr) {
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

