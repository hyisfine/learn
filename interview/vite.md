> config解析流程。获取cli参数、加载配置文件、加载env文件、对plugin进行排序。执行plugin里有关config的hook函数。解析cache dir、根目录和绝对资源目录。添加内置插件。创建一个内部使用的插件调用对象。汇集所有的参数成一个参数对象。
>
> 依赖预构建。作用：将各种模块模式统一处理为es module的形式。流程成。启动server前获取cache目录下的_metadata.json文件获取上次预处理依赖。通过json文件生成dephash，通过比对判断是否有新的依赖，如果有，对文件递归扫描获取依赖，通过esbuild进行esmodule 的转化。然后更新cachedir里的文件。在开发过程中遇到新的依赖时，重新开启整个流程。
>
> 插件。基于rollup的插件接口设计实现的，所以一定程度上rollup的接口同样适用于vite，同时vite也加了属于自己的特有钩子函数。作用，是vite的开箱即用能够实现的核心。
>
> 热更新。流程，客户端服务器通过websocket进行链接。服务器监听文件变更。通知客户端本次更新的类型和文件路径。客户端根据文件路径创建新的link或者script标签拉去新的文件。并执行相应的热更新 钩子函数。
>
> 为什么还需要打包构建。不打包的话 每个文件都会进行http请求。
>
> 自定义plugin。
>
> seo 优化 利用**transformIndexHtml** 提前注入对应的seo数据
>
> 处理css ，利用transform 判断文件名字，然后提前注入
>
> 

