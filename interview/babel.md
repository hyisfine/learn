> babel
>
> 是什么。js的编译工具，降级js的代码。实现对语法、api的向下兼容。
>
> 解析流程。词法解析、语法解析、生成ast、遍历ast、根据visitor对象操控节点类型、形成新的ast、根据新的ast生成代码。
>
> preset。本质是一系列插件的集合。执行顺序是从后往前。
>
> 插件。用于转化特定语法或api。执行顺序从前往后，先执行插件再执行preset。
>
> 插件的本质是实现一个visitor对象，通过访问者模式的形式，对不同的节点进行处理。然后生成新的节点。
>
> 语法转化的区别：use builtins entry：手动引用，全部加载。usage：按需加载。
>
> @babel/plugin-transform-runtime自动按需加载且不回污染全局变量。
>
> 