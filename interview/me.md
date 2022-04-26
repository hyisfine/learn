> 自我介绍
>
> 你好，我叫叶鹏程， 2017年毕业于西华师范大学信息与计算科学，目前所在的公司是北京顺势为快科技有限公司，是以vr影视内容输出的初创。我主要负责公司管理后台、用户小程序商家小程序，以及公司组件库的维护和开发，技术栈使用react+ts。同时临时用golang开发过一个微信中控平台，为此了解过一些后端开发。

> 技术选型，taro、react、typescript。考虑：公司原先主要是以react为技术栈、本身比较熟悉react、需要支持项目跨端展示、多人协作合作，选择加入ts减少项目运行时的错误和信息不对等导致的时间浪费。
>
> 组件库。基于公司业务和ui的风格，全局的页面pagewrapper组件、开发出了可以配置字体样式和元素宽高以及marginpadding的高阶组件、关闭小程序滚动实现自己的滚动组件、具有防抖功能的点击组件、统一风格的按钮组件、以flex布局为基础的col、row组件、全局弹框组件。
>
> 为什么使用高阶组件？全局样式(没有语法提示)、属性间的搭配不够灵活、单独写个字体组件不够灵活，无法满足其他组件也需要应用样式的情况。加上微信的组件分为view-cover-viwe、text、一斤button，切每个都有必须使用的原因，所以到处提出来。全局组件类似antd 的model。info的调用方式，基于路由路径对比和一个订阅发布函数实现的。参考了trao-ui。
>
> 遇到什么问题？优雅的处理tab快速切换时的数据错误问题，一开始是将数据请求和tab view绑定在一起，代码比较杂乱。然后想到调用request取消，但是不够灵活。最后是通过封装了fetch之后，每次请求产生位移的key，并传入fetch函数，在赋值对比当前的key和传入的key是否通用，保证了数据每次都是最新的请求数据。请求list时 ，会等待上次接口调用完成才重新请求。
>
> 印象最深：新的小程序项目，有自己一手搭建并完成主要功能和组件库。为什么自己写fetch hook，react-query的功能太多，但并不需要，ali的userequest同样依赖于其他的hook，且使用时都不符合项目构建之初继承自1.0的请求方式。将实际的请求方法保存在usecallback中，根据方法所需要的参加进行重新刷新，支持ts类型检测，自动识别返回的类型值，支持刷新、取消、手动触发、以及手动更改数据源。
>
> 拍照生辰海报的优化？减少图片大小、在前一个页面下载图片、用户选择时提前绘制canvas、点击拍照的过程中添加预览功能、并在后台进行图片生成。
>
> vite转为webpack，过程中没有出现太大的问题，只有在添加antd pro的时候，antd 引入less文件时和vite的别名解析产生了冲突，需要更改alias的写法。
>
> 怎么封装了分为header nav bar 和list，给定一个request，将当前的页面的。
>
> 微信中控，集中刷新各个项目需要的微信的token和ticket。使用的是golang，通过配置aws中的是cloud watch派发定时任务到sqs任务队列中，循环获取sqs中的任务，调用微信接口获取最新的token，存入redis中。

> ts是js的超集，拥有js的所有语法，同时扩展了自身的能力比如枚举值。ts拥有静态类型检查机制，需要编译后才能运行。编译完后的ts就是js代码了。

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
>
> line-height。设置行高，即设置行盒的虚拟高度。字体的大小不仅由font-size就决定，还有字体库决定，向上和向下延伸一部分，这样子的字体高度是字体的内容高度，行盒的高度一般是字体的内容高度，当我们设置行高时，会在内容的两端平均加上一般的高度值。
>
> 选择器权重。通用、元素、子类、后代、兄弟。相邻。 伪元素、属性选择、伪类、class选择、id、行内样式、important。
>
> flex布局。flex- direction、flex- wrap、justify- content主轴上项目对齐方式，flex-flow、place- content、align- content、align-items。item：order、align- self，flex，flex-group，flex-shrink，flex- basis。
>
> grid布局。grid- template-、place- content。justify、items。grid-auto-flow，gap。
>
> link&import。link是js的元素，可以通过js操控，不会阻塞dom解析。import 是css的规则一部分，等待页面加载完后才会解析。
>
> css架构。
>
> 1. oocss架构，分离结构与内容，css的样式与内容无关。
> 2. smacss，将css分为几大模块样式。
> 3. bem。block、element、Modifier
>
> 重排与重绘。关键渲染路径是指浏览器对html解析到最终绘制在页面上的过程。在浏览器的关键渲染路径中，分为dom解析cssom解析，然后两者结合形成render tree，然后在布局阶段计算元素的位置、大小等，在绘制阶段绘制像素点。重排是指由于元素的大小、位置等发生变化，引起浏览器重新计算元素布局的过程。重绘指元素的颜色、背景、等发生变化导致浏览器重新绘制像素的过程。由于在关键路径中重排在重绘前面，所以说重排一定导致重绘。性能优化：减少dom操作。减少对dom定位、大小的查询。集中增删查改dom。使用可以开启gpu加速的css样式，比如transform、filter、opacity。

> h5
>
> 语义化。语义化标签、article、section、p、header、footer、nav、mian标签等。作用：增强代码可读性、无样式的友好布局、便于seo优化、便于无障碍阅读。
>
> 视口。布局视口，浏览器默认的画布的宽度，一般为980px。通过document element、clientwidth获取。视觉视口，指的页面实际的宽度，当宽度小于布局视口时等于布局视口，通过window.innerwidth获取。理想视口，指当布局视口的宽度等于手机实际屏幕尺寸的宽度。通过window.scren.width获取。通过设置meta width=device-width，同时设置缩放比例来完成，按照理想视口来设置。
>
> dpr。设备像素比。物理像素和设备独立像素的比值。物理像素，实际渲染的像素点，设备独立像素，相对于手机尺寸的来说的渲染尺寸。
>
> 1px问题。由于在不同dpr的手机中，1px的物理像素实际上是有多个像素点渲染的，所以导致1px在屏幕上看起来比较粗。解决方案：svg、border-image、background-image、伪类+transform。
>
> 图片模糊问题。在不同的dpr手机中，一个像素点由多个像素渲染，由于多个像素的不能完全按照原图片上的色等比设置，导致图片模糊。解决方案：根据不同的dpr设置不同的像素比图片。
>
> 滚动穿透。fixed元素覆盖整个视口时，覆盖的元素还是能滚动。解决方案：添加touch- action：none。使用禁止默认事件和阻止事件冒泡的方法。
>
> 滑动穿透。fixed滑动时底部元素跟着滑动。解决方案：滑动时监听时候到达顶部或者底部。然后阻止默认事件发生。
>
> ios滑动不流畅。原因：ios开启了overflow-scrolling：none，手指滑动后脱离时屏幕不动。
>
> 键盘将页面顶起来。由于改变视口大小导致的。使用top 作为绝对定位。监听页面高度变化。
>
> 可替换元素。img、video、canvas。元素的样式展示由元素的自身的实际内容决定。
>
> 自闭合标签不可以添加伪类。因为没有content内容。

> 小程序
>
> 框架。小程序的架构分为多个渲染层、逻辑层。微信客户端通过event和data对两个线程的通信进行中转。
>
> 分包机制。独立分包、异步分包、分包预下载。
>
> 性能优化，减少不必要的setdata、使用分包机制、首屏预渲染、按需注入。代码压缩。

> 监控
>
> 作用。采集性能信息、收集用户行为数据、错误日志上报。
>
> 采取埋点、手动埋点、自动埋点、可视化埋点。
>
> 错误日志收集。try catch包裹。window。onerror 代码执行错误，unrejection promise为捕获错误，资源加载错误。
>
> 性能指标。fp 首次绘制、fcp首次内容绘制、lcp最大内容绘制、fmp首次有意义的绘制。ttl 可响应用户可交互的时间。
>
> 记录的用户行为。pv、uv、click、api record。
>
> 方法。手动埋sdk。封装小程序request方法，封装image、video、进入之前访问后端生成session。写过一个简单的webpack loader，对try catch里的error自动注入上报函数。过程：基于一个try-catchloader做的二次开发，通过visitor访问

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

> 跨端
>
> 原理：实现一个节点容器，并提供一套响应的api，然后在每个平台各自实现api。

> vite
>
> config解析流程。获取cli参数、加载配置文件、加载env文件、对plugin进行排序。执行plugin里有关config的hook函数。解析cache dir、根目录和绝对资源目录。添加内置插件。创建一个内部使用的插件调用对象。汇集所有的参数成一个参数对象。
>
> 依赖预构建。作用：将各种模块模式统一处理为es module的形式。流程成。启动server前获取cache目录下的_metadata.json文件获取上次预处理依赖。通过json文件生成dephash，通过比对判断是否有新的依赖，如果有，对文件递归扫描获取依赖，通过esbuild进行esmodule 的转化。然后更新cachedir里的文件。在开发过程中遇到新的依赖时，重新开启整个流程。
>
> 插件。基于rollup的插件接口设计实现的，所以一定程度上rollup的接口同样适用于vite，同时vite也加了属于自己的特有钩子函数。作用，是vite的开箱即用能够实现的核心。
>
> 热更新。流程，客户端服务器通过websocket进行链接。服务器监听文件变更。通知客户端本次更新的类型和文件路径。客户端根据文件路径创建新的link或者script标签拉去新的文件。并执行相应的热更新 钩子函数。
>
> 为什么还需要打包构建。不打包的话 每个文件都会进行http请求。

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

> 优化
>
> 加载时优化。资源缓存、dns预解析、代码压缩、开启gzip、使用ssr、使用cdn资源加速、使用http2、减少http请求、小文件使用base64、按需加载、使用预下载。
>
> 运行时优化。减少重排重绘了，使用虚拟列表、使用事件委托、使用gpu加速的属性来优化动画。

> http
>
> 分层。五层：应用、传输、网络、链路、物理。7层：应用、表达、会话、传输、网络、链路、物理。
>
> dns解析。检查缓存：浏览器、系统、路由、服务商。递归：查询根域名查询、顶级域名、目标域名。
>
> tcp/udp。tcp提供稳定可靠的连接的通信传输，udp提供实时、高速的无连接的通信传输。
>
> uri/url。uri 统一资源描述符，url统一资源定位符。
>
> 报文。首部、空行、主题。首部：请求行/状态行、首部、通用首部、实体首部。
>
> 内容协商：同一个url 根据accept相关的字段返回不同的文件。accept、language、chart、encoding。vary用于确定协商时用到的字段。协商方式：服务器、客户端、两者结合。
>
> 范围请求：用于音视频请求。
>
> 状态码。200:请求成功，204:请求成功无主体。206:范围请求。301永久重定向：此时保存时保存的是新资源，302临时重定向，303临时重定向，明确表明需要使用get请求新资源。304协商缓存。307临时重定向，不会改变请求方式，400 数据请求格式不对，401无权限，403拒绝访问，404资源未找到，405请求方法错误。500服务器错误，503服务器停止工作。
>
> 缓存。强缓存：expire过期时间，相对于服务器的过期时间，cache-control相对于本地浏览器的过期时间，max-age，s-maxage代理缓存，mini-refresh，需要多少时间内最新的资源，max-stale 允许过期多少时间内仍可以用，must-revealeddate，过期后必须验证缓存，public ，公共缓存，即使是为设置max-age或时post，no-cache，需要验证缓存，no-store，不进行缓存。immutable，过期时间之前都不必重新验证。协商缓存：last-modified/if-since-modified。根据上次文件更改的时间判断。etag/if-none-match，根据文件修改后产生的标示进行缓存。
>
> cookie。服务器发送给客服端的一个数据块，每次客户端请求时都会带上这个数据，用于用户身份识别、和行为记录。安全前缀：_ _ secure _ _ ，使用secure，_  _host,使用secure、不可设置path和domain。由于secures可以被移除，但是前缀移除后无效。same site：none、lax、strict。lax 只有一些安全的跨域请求如get、a链接、预下载且url发生变化的请求才允许发送。same party。设置后 多个域名可以关联在一起，跨域请求时可以携带cookie。单条为4kb，有数量限制，多出来的cookie会被删除。priority可以设置删除的优先级。
>
> get/post。get受限于浏览器有大小限制，get明文传输，只支持字符串编码，可以被缓存、保存、记录和浏览器会退。post支持多种数据格式、加密传输。本质上都是tcp的一次连接，不同的是根据语义个方面进行了限制，同时post在tcp链接是会发送两次数据，一次header，一次data。
>
> 安全。csrf跨域请求攻击。开启samesite。使用token。xss 跨域脚本攻击，对用户的输入数据进行编译，开启http-only。
>
> cors 跨域资源共享。预请求：head、get、post。且只使用了特定的首部、accept、Content-Type 为text/plain、multiple-，请求中没有注册事件监听。access-control-allow header/method/origin/credentials，expose-header、max-age，origin、request-header/method。
>
> 解决跨域。jsonp、nginx代理、node 中间层、开启cors、postmessage、iframe、windows.domain
>
> http1.1/http2。http1.1:长链接、基于文档流传输数据，管线化功能可以发起多个请求，但是造册成对头阻塞。http2:基于二进制流进行传输，将请求拆分成多个流并把多个请求的流合并到一起组成一个帧。多路复用。可以设置优先级，服务端推送、header压缩。
>
> 从url到页面。解析转译url。检查资源缓存、dns解析、tcp3次握手（发送syn包到服务器、服务器发送ack、客户端再次发送ack进行连接）、tls协商加密、数据传输、客户端接受响应，解析html，生成dom和cssom，组合生成render 树，元素进行布局计算、绘制像素到页面。客户端发送fin到服务端，服务端ack，服务端发送fin。等待一段时间后，客户端ack，关闭连接。
>
> 

> react
>
> fiber。fiber架构是react16的新的架构，旧的stack 架构中，用户的一次数据更新会导致整个dom树的重新比对，且过程无法停止，js线程占据过时间，导致页面卡顿。新的架构引入了Scheduler，任务调度器，借助他对js执行和ui渲染进行分配，实现了时间切片、异步渲染和可中断渲染的能力，极大提高了页面流畅性。fiber节点则是基于当前架构体系根据reactelement创建的对象，存放当前元素的相关信息。
>
> 性能优化。eagerstate，bailout根据优先级判断是否需要更新。多次调用时，根据优先级判断是否为同一个task，否则取消上次的task，重新生成一个，由于任务为异步任务，所以必定是会实现自动批任务的。
>
> react18。concurrent 模式，通过fiber架构实现的，异步渲染，可中断渲染，更新优先级、自动批任务处理、suspense list。新的过渡hook。
>
> redux。单一数据源、纯函数修改、state只读。本质是一个订阅发布+单列模式的库。