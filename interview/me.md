> 自我介绍
>
> 你好，我叫叶鹏程， 2017年毕业于西华师范大学信息与计算科学，目前所在的公司是北京顺势为快科技有限公司，是以vr影视内容输出的初创。我主要负责公司管理后台、用户小程序商家小程序，以及公司组件库的维护和开发，技术栈使用react+ts。同时临时用golang开发过一个微信中控平台，为此了解过一些后端开发。

> js
>
> 执行上下文。每个函数在执行时都会产生一个相关的执行上下文，同时会以函数的arguments参数为基础创建一个活动对象，此后函数里创建的变量和函数都会挂在到当前对象中。函数产生执行上下文后，会将上下文压入一个执行上下文栈中，遵循后入先出的原则。函数的上下文在上下文栈中时，其活动对象会与栈内的每个上下文所携带的活动对象会链接在一起，形成一条作用域链，其决定了当前上下文可以访问到的变量和函数以及他们的顺序。
>
> 类型。基础类型number、bool、symbol、string、null、undefined、bigint。引用类型objet、tuple、record。
>
> var const let区别。var的声明范围是函数作用域，let、const的作用域是块级作用域。var、let const都存在变量提升，但let const由于暂时性死区的关系提升了但是没有设置初始值不可以使用。let const不可重复声明，const必须声明时赋值切不可更改，但引用对象可以更改内部的属性。
>
> this对象。this对象时执行上下文中的一个属性，指向实际调用当前函数的对象。一般通过new、bind、call、apply和对象的属性调用以及普通函数调用来判断this的指向问题。实际上，在js中存在一种reference规范类型，它的作用是描述js里的各种操作行为。他有几个重要的值，一个是当前base 属性的所属对象或环境。一个name。根据js的描述，在判断函数的this指向时，会根据函数调用时的操作是否为一个reference类型，如果不是则指向undefined，如果是则指向base对应的对象，如果base是环境，则指向undefined。
>
> 箭头函数vs普通函数。箭头函数有简单缩写、不可以做构造函数、生成器函数。没有arguments、prototype。this指向在创建之初就已确定不可更改。
>
> 闭包。一个函数能调用另外一个函数内部定义的变量就称之为闭包。在形成闭包函数的作用链时，会链接访问的函数的活动变量对象，导致在访问函数的执行上下文退出栈之后活动对象依旧被保留的情况。
>
> 原型链。实例对象的_ _ proto _ _指向其构造函数的prototype属性，而构造函数的_  _ proto _ _又会指向其构造函数的prototype，最终指向object的prototype，而object的prototype指向的是null。这样通过prototype和 proto的链接关系，形成了一条原型链。对象在访问某个属性时，会随着原型链层层往下查找。
>
> 严格模式。以更严格的代码规范和语法规范检查代码。目的是为了提前发现错误，并为向后兼容做准备。变量必须声明、不可修改arguments、对象的键名不可重复、this指向不再强制转换为顶层对象。类和模块默认是严格模式的。函数的可选参数不可以是严格模式。
>
> 创建对象。工厂函数、子面量对象、构造函数、原型链。
>
> 对象继承。原型链、构造函数、组合、原型式、寄生、寄生组合。
>
> 路由模式。hash、监听onhashchange。history，触发push、replacestate，监听popstate。
>
> 隐形转换。分为四种种转换，引用类型转为基础类型。基础类型转string、number，条件语句转为bool。内部有一个toprimite函数控制转化流程。一般来说先转为number，执行value of如果返回的还是引用着执行头tostring方法。但是date是个例外。它先执行的tostring。
>
> object对象。getownprototypenames、hasownprototype、frezz冻结、getPrototypeOf、hasown、is、assign。
>
> 迭代器。迭代，指可以循环执行同一段代码的操作。for 循环是简单的一个迭代。内部实现了迭代协议的对象称为可迭代对象，如arr，map、字符串等。同时我们也可以自定义迭代协议，只要返回一个包含next方法的对象就可以。
>
> 生成器。是js一个可以控制代码暂停和恢复执行的功能。他和迭代器一样，是在内部实现了迭代器协议的一个特殊的函数。通过yield关键字进行代码执行控制。实现原理：通过switich返回一个包含next方法的对象。async、await本质上是生成器函数和promise实现的语法糖。
>
> json。人为构造字符串的形式加快json转化。stringily有两个参数，第二个参数可以是个数组，包含需要保留的键。也可以是个操控函数，可以控制最终生成的json字符串。函数、undefined、symbol转化为null、错误不可转化、不可以转化循环引用对象。
>
> 任务队列、事件循环。是js为了实现异步代码和同步代码按某种顺序执行的机制。函数在执行过程中会被压入到调用栈中，而异步函数则交由相应的线程处理，并在处理完成后将回调函数加入到任务队列队列中。js主函数执行完毕后会循环执行人物队列里的函数，并压入到调用栈中。微任务：promise、MutationObserver。宏任务，代码块、定时器、ui刷新 postmassage。
>
> mvvm、mvc、mvp。mvvm架构是mvp架构的进一步封装。在mvp架构中，m层与p层的通信和p层与v层的通信需要调用相应的接口触发相应的事件，在mvvm架构中，框架整合了调用接口触发事件这一行为，开发者 不必关心如何调用接口。m层的变化和v层的操作会直接影响到对方。
>
> 模块化。解决全局变量污染和命名冲突问题，同时便于代码维护、代码封装和代码复用。commonjs 社区的方案，同步调用模块。amd异步调用依赖前置 、cmd依赖就近。es module 原生的模块方案。区别，commonjs本质是将代码重新包裹到一个函数中，调用时执行函数，所以它返回的值是一个拷贝，且运行时加载。es module返回的是值的应用，且在编译阶段就能对值和导出变量进行引用链接。所以返回的是变量的值的引用。且是编译时加载。
>
> es module原理。先是通过entry文件递归搜集并下载所有的依赖模块。在分析模块代码实例化阶段为模块的导出对象分配空间。同时通过模块的导入和导出关联空间。运行代码，为分配的空间赋值。
>
> 设计模式。遵循solid原理。单一职能、开闭。工厂模式、单例、发布订阅、装饰器、代理者、访问者模式。
>
> 

> css
>
> BFC。块格式化上下文。css渲染规则的一部分。是一个独立的渲染区域，决定了内部子元素的布局和其他元素之间的关系。常用来解决兄弟、父子元素之间的margin重叠、浮动高度塌陷问题。开启bfc的方式有，根元素、inline-block、flow-root、overflow、float、transform、filter、opacity、absolute、fixed、flex个grid的子元素。
>
> 层叠上下文。是元素的三维虚拟结构。正常的文档流中，元素平铺在一起，x轴和y轴平铺在一起，当元素发生堆叠时，我们就需要通过层叠上下文描述这种堆叠关系。通过z-index可以操控层叠上下文在z轴上的展示顺序。一个层叠上下文中，他的元素的层叠顺序依次为、background、z-index< 0、块级盒子、float、inline-box、z-index auto、0 >0/   absolute、relative且z-index不为auto，fixed、flex、grid的子元素的z-index不为auto，transform、filter、opacity等css属性。
>
> display。分为几大类，控制外部显示的有block、inline 。控制内部布局的table、flex、flow-root、grid。布局内部元素、list-item、table-header。参数结合的inline-block。控制显现的none。
>
> position。static，参数的trbl无效。relative，未脱离文档流。absolute，脱离文档流生成了一个BFC。fixed 脱离文档流，生成了BFC和层叠上下文，当祖先元素有transform或者filter时，会以组件元素定位。sticky，产生了一个层叠上下文。粘性定位，正常的文档流中，当祖先元素中有overflow不会visible时，会根据当前祖先元素定位，而不管是否产生了滚动。
>
> 文档流。元素从左右往右从上往下按顺序排列，块元素会另起一行且宽度为父元素100%，行内元素从左往右排列，不够重新生成一行，紧挨的元素的margin会合并。