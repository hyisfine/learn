1. 打包流程：合并参数、创建complier对象加入plugin hooks、注册plugin、解析入口文件（获取入口源码，通过Babel生成ast获取require里的内容，调用loader处理源码、同时替换为webpack__require、递归调用require里的源码，形成一个deps对象）、打包chunk（拼接源码为一个立即执行函数）。最后输入文件。

2. tree shaking 基于es module的静态分析和编译时加载实现的，es module可以在编译阶段就确定模块间导入导出值的关系，从而确定哪些代码是用到的。而commonjs 需要运行结束导出exports才可以确定。

3. 模块提升，即将只有单个引用的模块直接替换require语法。

4. sourceMap是一项将编译、打包、压缩后的代码映射回源代码的技术。存放文件、变量名、信息字符串。

   1. 种类。inline  base64到源码、eval 使用字符串缓存、source-map 文件、module多层编译的数据、cheap只有行信息
   2. mapping，转后的列、文件、转化后的行、列、名字。使用相对数字。
   3. base64结合vlq编码。通过二进制保留任意的数字。 

5. 作用：打包、兼容、能力扩展

6. 常用loader：style、css、sass、post-css、url、file、source-map、ts-loader、prettier、babel、cache、NamedModulesPlugin

7. 常用plugin：html、webpack、clear、uglify、ts-fork、mini-css、analyzer、define、terser

8. 模块打包：递归构建完之后的代码会合并到一个chunk中，此时会把源码装入一个函数中，此函数传递module，module。export 、

9. 热更新流程：建立ws通信、监听文件变化、告知浏览器文件变化、请求变化的hash值、请求新的模块数据、比较新老模块、将新模块加入到module对象中。

10. 优化构建速度：使用最新版本、开启多进程构建thread- loader、多进程压缩terser、mini-css、使用es module实现tree shaking和模块提升、减少不必要的loader、缩小loader查看范围的include、减少文件类型的后缀、指的第三方库的路径、设置noparse忽略不必要的库解析、基础库分离、使用外部引入的方式、使用splitchunk分离、合理使用插件或者loader提供的缓存。缓存babel-loader、terser缓存hard- source缓存。

11. 按需加载的实现，在打包时，把当前函数的引入写成一个promise 


> webpack
>
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
> 构建优化。多线程构建、多线程压缩、减少不必要的loader、T合理使用includes&excludes、减少文件后缀、指定第三方的入口、添加noparese减少不必要的解析、添加文件缓存、babel、terser、hard。使用es module实现tree shaking，作用域提升，分割基础库、使用import 配置按需加载。
>
> 插件。写过简单的插件，在catch语句之后添加一个监控请求。 调用babel transform，配置visitor添加对catch代码块的处理函数，使用babel
>
> webpack5新特性：tree shaking、模块联邦、持续性缓存
>
> 异步加载模块原理：使用import获取require.ensure异步加载模块，构建之后会将异步模块单独打包，打包的文件执行后会代码及模块id push到一个全局的webpackJsonp数组中。在push之后会将异步模块添加到每个入口文件的modules中。而异步模块加载代码会被编译为一个异步函数，即webpack require。e函数。在此函数中，将会创建script标签引入模块，并执行onload回调。
>
> 微前端：即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。





