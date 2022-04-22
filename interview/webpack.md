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

10. 按需加载的实现，在打包时，把当前函数的引入写成一个promise 

    



