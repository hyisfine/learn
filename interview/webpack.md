
> 作用。打包依赖，兼容代码，扩展能力。
>
> 打包流程。参数解析、创建compiler对象，基于tapable注册事件监听。 注册plugin、解析entry文件，递归扫描获取所有的文件， 根据loader匹配规则执行不同的loader。根据entry文件和相应的module 合并生成chaunk。最后输入文件。
>
> loader。本质上是一个函数传递，参数为源码内容，同时this指向当前的执行上下文。
>
> plugin。是一个拥有apply函数的类型，参数为compiler对象，通过注册compiler对象上的事件监听不同时期的任务。
>
> tree shaking。基于es module的静态分析和编译时加载实现的一种优化手段，用于删除未引用的变量和对象，减少打包体积。
>
> 利用的是esm的静态分析能力，从入口处扫描所有的模块，抽象成一个ast，然后执行代码，将执行的代码进行标识，最后删除未被标识的代码。所谓静态分析，即在代码执行前就能对整体代码依赖调用关系等进行分析读取：即形成的模块地图和模块记录。
>
> 作用域提升。即对于只有单个引用的模块，不再放入到模块对象中，而是直接在require引用时替换整个源码。减少多余代码。
>
> source map。一种将构建后的代码映射回源码的技术手段。种类：inline、eval、module、cheap。mapping包含所有的额信息，变量名字、文件名、转换前的行列、转换后的列。使用base64+vlq编码的结合。
>
> 常用loader。url、file、sass、style、css、postcss、ts、cache、babel、thread
>
> 常用plugin。html、copy、css-mini、terser、define、namemodule、fork、clear、eslint、hmr
>
> 热更新流程。建立ws链接。监听文件变化。客户端获取服务返回的hash值，根据hash使用jsonp获取到变化的模块代码，根据替换或添加webpack—modules里的相应文件。
>
> 构建优化。开启webpack 的文件缓存， cache: {   type: 'filesystem', *// 使用文件缓存* },减少不必要loader，使用esbuild或则swcloader代替babel- loader。设置loader的include。设置资源管理{
>test: /\.(png|svg|jpg|jpeg|gif)$/i,
> include: [
> paths.appSrc,
> ],
> type: 'asset/resource',
> },替代file urlloader 。优化extensions 文件类型的数量，指定modules参数缩小解析范围，thread-loader开启多进程构建。开启css 和js的多线程压缩。css mini 分离css文件，配置splitChunks分离代码，设置多个入口，配置external 设置外部扩展、设置sideEffects启动树摇，设置`babel-plugin-component`启用组件的按需引入
> 
> css-loader 处理 import的css文件。 style-loader 将css设置为style里的样式。css mini 分离css文件形成link文件。
>
> 写过简单的loader，在catch语句之后添加一个监控请求。 调用babel transform，配置visitor添加对catch代码块的处理函数，使用babel
>
> const parser = require('@babel/parser')
>
> const template = require('@babel/template').default
>
> const traverse = require('@babel/traverse').default
>
> const generator = require('@babel/generator').default
>
> 抽离错误 到单独的文件 
>
> webpack5新特性：tree shaking、模块联邦、持续性缓存
>
> 异步加载模块原理：使用import获取require.ensure异步加载模块，构建之后会将异步模块单独打包，打包的文件执行后会代码及模块id push到一个全局的webpackJsonp数组中。在push之后会将异步模块添加到每个入口文件的modules中。而异步模块加载代码会被编译为一个异步函数，即webpack require。e函数。在此函数中，将会创建script标签引入模块，并执行onload回调。
>
> 微前端：即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。
>
> sideeffect   types module babel-plugin-import







