1. babel，js 编译器，基础工作是负责对源码进行编译。转换。
2. babel-preset-env转译语法。Babel- polyfill转译api。babel-preset-env use Built in entry，手动引入全部引入、污染全局属性。usage 自动引入、按需引入、污染全局。runtime 手动引入、额外的代码。`plugin-transform-runtime` runtime 的增强。自动引入，将helper函数统一引入。
3. Babel 流程：词法分析获取词法数组、语法分析生成ast、遍历ast并通过visitor处理各个节点最终转换为新的ast、通过新的ast生成新的代码。
4. preset 一系列插件的集合：先执行plugin、再倒序执行preset/
5. plugin本质是一个visitor，通过访问不同的类型

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