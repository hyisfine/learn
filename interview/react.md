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



> react
>
> fiber。fiber架构是react16的新的架构，旧的stack 架构中，用户的一次数据更新会导致整个dom树的重新比对，且过程无法停止，js线程占据过时间，导致页面卡顿。新的架构用链表取代了树，引入了Scheduler，任务调度器，借助他对js执行和ui渲染进行分配，实现了时间切片、异步渲染和可中断渲染的能力，极大提高了页面流畅性。fiber节点则是基于当前架构体系根据reactelement创建的对象，存放当前元素的相关信息。
>
> 性能优化。eagerstate，bailout根据优先级判断是否需要更新。多次调用时，根据优先级判断是否为同一个task，否则取消上次的task，重新生成一个，由于任务为异步任务，所以必定是会实现自动批任务的。
>
> react18。concurrent 模式，通过fiber架构实现的，异步渲染，可中断渲染，更新优先级、自动批任务处理、suspense list。新的过渡hook。
>
> redux。单一数据源、纯函数修改、state只读。本质是一个订阅发布+单列模式的库。
>
> scheduler调度原理。注册任务后，以当前时间和任务优先级添加的时间作为task的过期时间，task入堆， 判断是否在执行任务循环，如果没有则请求调度事件循环。服务器使用setimmediate、浏览器使用messageChannel为调度事件的异步处理函数。(不使用settimeout是因为由于它有4ms的最小调用间隔。由于函数的多层嵌套和定时器的回调阻塞导致的。)取出事件栈中的第一个task进行处理，根据task的回调函数返回的值，如果返回一个函数，则保存为当前task的回调函数，并判断是否超时，如果超时则取消任务循环，并判断是否还有task的，再次调用messagechannel 触发下一次的任务循环。
>
> react新架构的流程。更新state创建任务，注册任务，调度任务并执行回调，触发fiber树的重新构造，循环递归构造每一个fiber节点，同时判断任务是否超时、fiber树构造完成后切换到视图上。
>
> reconciler阶段。从更新的节点出发，一路向上给父节点添加更新优先级，并从根节点出发，从头开始递归构造新的fiber树。
>
> scheduler：已过期时间做比较的最小堆算法。
>
> hook原理：hook本质上是挂在在组件对应的fiber上的一条链表结构，链表元素是对应hook的形成的hook对象，在执行到当前组件时，通过调用hook，获取到fiber链表中对应的hook对象。  在更新组件时通过将当前fiber的链表数据克隆到对应的内存fiber中，实现数据的持久化缓存。
>
> state hook在dispath 后会创建一个update对象，并关联在hook对象上，同时注册一次scheduler任务。多个update对象形成一个链表结构，在内存fiber更新构建阶段，会将updet合并形成最终的state值。
>
> effect hook在创建阶段会创建一个effect对象，并挂载在hook对象上，同时标记当前fiber的副作用flag，多个effect hook会关联在一起形成链表结构。在渲染commit阶段，会在commit之前异步处理带有useeffecct的fiber，在 commit之后同步处理uselayout effect的fiber。
>
> 优先级：更新优先级、全局渲染优先级、fiber优先级、调度优先级、事件优先级。如果全局的渲染优先级renderLanes不包括fiber.lanes, 证明该fiber节点没有更新, 可以复用.
>
> bailout根据优先级比较得出：根据全局的渲染优先级和组件的优先级比较。
>
> 调和阶段：beginWork 生成fiber，设置flags，设置fiber的节点引用。completework，生成dom，挂在父节点的副作用队列。设置flags。
>
> 目前来看，当优先级为 lane === SyncLane &&executionContext === NoContext &&      (fiber.mode & ConcurrentMode) === NoMode &&时set state依旧可以为同步更新
>
> commit阶段分为几个步骤：重置全局变量、before阶段同步处理snapshot相关的副作用和异步调度use Effect回调。commit阶段调用reactdom的api处理dom的增删改同时调用layout effect销毁函数。after阶段处理更新和回调相关的副作用，此处调用layout effect和didupdate、以及setstate的回调。检测是否再次产生了调度任务。
>
> 状态 持久化依赖于双缓存技术。
>
> 全局变量指向当前正在构造的fiber，全局hook变量指向当前fiber的当前hook，每次执行对应的hook函数指针就会向下。 构造页面fiber和内存fiber时两个hook对象会共享相同的数据。
>
> 对于状态hook，普通的状态只是在两颗fiber树之间共享数据。对于state，会创建一个update对象挂载在state hook的更新链表上，同时触发更新调度。对于hook的更新列表，只会计算优先级高的update对象，同时保存低优先级的update对象的相对关系。优先级满足时再次计算。节流：通过判断触发的调度优先级，如果相等则不重新调度（因为是异步调度的，此时虽然触发了多次state更新，但是只是将update对象挂载在fiber上，只需要触发一次更新任务即可。防抖：当优先级不同时，取消上次的任务回调，重新调度任务）
>
> 对于副作用effect，创建时会创建effect对象挂载在当前hook对象上，多个effect对象会关联为一个环形链表。更新时，保留之前的销毁函数，比较deps，新建一个effect，但是不添加需要更新的tag，
>
> 对于use Effect/layout 区别。内部调用方面，use Effect的销毁和回调是异步的，layout的销毁和回调是同步的。，在before commit之前通过scheduler调度异步任务先处理use Effect 的销毁在处理回调函数。在commit阶段同步处理layout的销毁函数。在after commit之后同步处理layout的回调函数。layout的执行时机和did update是一致的。内部标识方面，fiber的flags标记不一样，创建的effect对象的flag也不一样。
>
> 受控组件非受控组件：受控组件，value的值由组件的state控制，只能由组件出发更新的的方式更新组件的值。受控组件应用场景：实时的表单验证、条件禁用、 提交时的校验。
>
> 长列表的优化：虚拟列表、时间切片渲染、使用transform 代替滚动。
>
> class  func 区别：class 内部会保存一个实例、func每次render都会执行。class没有this，无各种生命周期。可以通过react hook添加生命周期和state。class逻辑难以复用，可以通过高阶组件的形式。fc组件通过react hook复用逻辑。
>
> fiber局限性：
>
> immutable。是指一旦创建就不可更改的数据类型。在react中，每次更新的数据都要保证和上一个数据是不同的引用类型。其特点是持久化数据结构和结构共享。好处是减少内存消耗，便于数据回退和数据的时间旅行。
>
> 跨组件通行：父子props、子父回调、兄弟状态提升、全局变量或事件、状态库。context。
>
> context redux区别：context是react提供的直接访问祖先节点数据的方法，底层实现是创建了一个context类型和provider的react element，在消费context 时通过consumer获取数据，在更新时通过provider查看所有消费context的节点并标记优先级触发更新。redux是社区提供的一种全局状态管理的库。本质上是一个单例模式+订阅发布模式的依赖库。他的数据流程为dispatch-action-reducer。reducer功能多样，可以实现时间旅行和副作用处理。
>
> redux远嘛
>
> react vue区别：vue推崇渐进式开发、数据可变和双向数据绑定。react推崇函数式编程、数据不可变和单项数据流。vue的架构模型为mvvm，使用proxy代理和依赖收集等方式实现响应式更新，只有一依赖变化的组件才会重新渲染。react的架构为mvc， 使用状态机机制，需要手动调用setstate才能触发更新响应，更新世会重新渲染整个组件树。vue使用模版渲染和.vue文件书写组件。react使用jsx语法。
>
> 优劣：vue进了能的降低了前端开发的门槛，语法简单，更新精确到组件。react 的函数式编程和数据不可变确保了他的稳定性和可测试性，上手难度较高。vue需要理解的概念和api较多。vue的依赖库大多都是官网开发维护的，简单易上手，react的依赖库基本靠社区发展和维护，社区更繁荣。

