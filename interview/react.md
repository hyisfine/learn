1. 什么是fiber
   1. fiber是react种的一种数据类型，由React element对应生成。
   2. fiber架构是新的架构体系。久的stack 架构通过递归的方式执行react的更新，缺点是更新时同步的，无法中断更新，当更新数据大时，会js线程占据一直，造成用户卡顿。新的架构加入了shoulder来异步执行和调理任务优先级，同时通过react element生成的fiber结构，实现了可中断渲染、任务切片、异步渲染等功能。
   3. 新的架构解决cpu瓶颈问题，js执行一段时间后将主线程留给渲染线程。
2. 性能优化
   1. eagerstate，调用setstate或者hook时，会先获取上次生成的state结果，如果一样则跳过本次更新。
   2. bailout，reconciler阶段通过比对子节点的lanes和render lanes，判断当前子节点是否需要更新。当触发更新时，触发的节点会向上冒泡设置祖先的lanes。
   3. 多次调用set State时，通过判断上次和这次的优先级，决定是不是复用上一次的task。如果前后两次优先级不一样，取消上次优先级，创建新的task。
3. reconciler 运作流程
   1. hook、setstate创建一个update、触发task的创建。使用scheduler调度任务，等待任务回调。任务回调里执行fiber的创建，等待fiber创建 成功后commit到root。
4. use Effect，创建effect，链式存放，commit阶段，在before mutation时异步注册task执行use Effect。after mutation之后执行layout，layout同步执行，更贴近did update。
5. set state之前时同步的，只是咩有把值直接设置到state上，而是等待代码执行完后再赋值。新的框架，由于使用scheduler调用，所以是异步的，但是当任务优先级时同步时，和之前的一样，也是立即执行。
6. diff算法，单点diff，在render阶段，通过比对旧fiber和新react element得数据，判断当前节点是否复用。多点diff，先一轮循环获取公共子序，然后在新老序列中，循环遍历，确定新序中的新增节点和老序中的删除节点。
7. 执行到当前的fiber时，将每一个hook一链式结构存在memoizedState中，再次调用时，获取旧fiber节点的数据。
8. redux
   1. 原则：单一数据源、纯函数修改state、state只读，通过dispatch action修改state。本质上就是一个订阅发布模式。每次修改返回的state都是新的state。
   2. 流程：dispatch action，action执行reducer，reducer返回新state。
   3. 中间件。实质是一个科里化函数，返回的函数值会作为下一个函数的值。
9. react 18新特性
   1. 自动批任务处理。suspense list。新的hook useTransition、useDeferredValue、supense list的展示模式、可中断渲染、设置渲染优先级。
   2. 更合理的拉去数据与组件渲染关系。之前：先渲染获取数据后再更新。现在：获取数据时即rneder、等待数据填充。
10. router