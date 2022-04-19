1. babel，js 编译器，基础工作是负责对源码进行编译。转换。
2. babel-preset-env转译语法。Babel- polyfill转译api。babel-preset-env use Built in entry，手动引入全部引入、污染全局属性。usage 自动引入、按需引入、污染全局。runtime 手动引入、额外的代码。`plugin-transform-runtime` runtime 的增强。自动引入，将helper函数统一引入。
3. Babel 流程：词法分析获取词法数组、语法分析生成ast、遍历ast并通过visitor处理各个节点最终转换为新的ast、通过新的ast生成新的代码。
4. preset 一系列插件的集合：先执行plugin、再倒序执行preset/
5. plugin本质是一个visitor，通过访问不同的类型