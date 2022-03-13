# JS

#### void 0 和undefined

> undefined不是关键字和保留字，所以可以被修改值
>
> void 明确规定返回一个undefined

#### 执行上下文与作用域

> 每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。
>
> 变量或函数的上下文决定 了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象（variable object）， 而这个上下文中定义的所有变量和函数都存在于这个对象上。
>
> 上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）。
>
> 这个作用域链决定 了各级上下文中的代码在访问变量和函数时的顺序。
>
> 。上下文在其所有代码都执行完毕后会被销毁，包括定义 在它上面的所有变量和函数（全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器）。
>
> 上下文之间的连接是线性的、有序的。每个上下文都可以 到上一级上下文中去搜索变量和函数，但任何上下文都不能到下一级上下文中去搜索。
>
> 当在特定上下文中为读取或写入而引用一个标识符时，必须通过搜索确定这个标识符表示什么。搜 索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索 停止，变量确定；如果没有找到变量名，则继续沿作用域链搜索。

#### var、let、const区别

> 在使用 var 声明变量时，变量会被自动添加到最接近的上下文。
>
> 非严格模式下，如果变量未经声明就被初始化了， 那么它就会自动被添加到全局上下文。
>
> var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升” （hoisting）。
>
> let 的作用域是块级的，这也是 JavaScript 中的新概念。块级作用域由最近的一对包含花括号{}界定。换句话说，if 块、while 块、function 块，甚至连单独 的块也是 let 声明变量的作用域。
>
> 同一作用域内let不能声明两次。
>
> let 声明的变量不会在作用域中被提升。
>
> 在 let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），即js解析时变量会创建出来，但是并未进行词法绑定，所以引入错误。

#### this

> this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。
>
> 四种方式判断this指向：new 操作，使用了aplly、call、bind方法改变this指向、是否作为对象的方法属性调用、函数调用指向windows。
>
> 但实际上，this指向的确定要与Reference类型有关。
>
> Reference类型时js的逻辑类型，用来解释delete、typeof和赋值等操作行为。
>
> 他有几个属性，base 、name 、strict。base表示操作标识符所在的对象或者环境，name是操作标识符，strict为布尔值表示是否为严格模式。
>
> 确定函数的this指向时，首先确定调用的函数调用语法结果是否为Reference，如果不是，则this指向undefined；如果是，判断Reference的base是否为一个对象，如果是则只想这个对象，否则指向undefined。非严格模式下this为undefined会被替换为window

#### 事件流

> IE 事件流被称为事件冒泡，这是因为事件被定义为从最具体的元素（文档树中最深的节点）开始触 发，然后向上传播至没有那么具体的元素（文档）。
>
> Netscape Communicator 团队提出了另一种名为事件捕获的事件流。事件捕获的意思是最不具体的节 点应该最先收到事件，而最具体的节点应该最后收到事件。
>
> DOM2 Events 规范规定事件流分为 3 个阶段：事件捕获、到达目标和事件冒泡。

#### 事件处理

> HTML 事件处理程序。
>
> addEventListener()主要优势是可以为同一个事件添加多个事件处理程序。
>
> 通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()并传入与添 加时同样的参数来移除。
>
>  JavaScript 中，页面中事件处理程序的数量与页面整体性能直接相关。原 因有很多。首先，每个函数都是对象，都占用内存空间，对象越多，性能越差。其次，为指定事件处理 程序所需访问 DOM 的次数会先期造成整个页面交互的延迟。

#### 事件委托

> 事件委托利用事件冒泡，可以只使用一个事件 处理程序来管理一种类型的事件。

#### 闭包

> 闭包指的是那些引用了另一个函数作用域中变量的函数。

#### 严格模式

> 以更严格的要求运行js代码
>
> - 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
> - 消除代码运行的一些不安全之处，保证代码运行的安全；
> - 提高编译器效率，增加运行速度；
> - 为未来新版本的 Javascript 做好铺垫。
> - this 不强制指向windows
> - class、module默认为严格模式

#### instanceof	

> **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
const myInstance = (left, right) => {
	let proto = Object.getPrototypeOf(left)
	const prototype = right.prototype

	while (true) {
		if (!proto) return false
		if (proto === prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
} 
			
```

#### new

> **`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
>
> 1. 创建一个空的简单JavaScript对象（即`**{}**`）；
> 2. 为步骤1新创建的对象添加属性`**__proto__**`，将该属性链接至构造函数的原型对象 ；
> 3. 将步骤1新创建的对象作为`**this**`的上下文 ；
> 4. 如果该函数没有返回对象，则返回`**this**`。

```js
const myNew = (Sub, ...args) => {
	let obj = {}
	obj.__proto__ = Sub.prototype
	let res = Sub.apply(obj, args)
	typeof res === 'object' ? res : obj
}
```

#### Object 类型

> 1. constructor：用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object() 函数。 
> 2. hasOwnProperty(propertyName)：用于判断当前对象实例（不是原型）上是否存在给定的属 性。要检查的属性名必须是字符串（如 o.hasOwnProperty("name")）或符号。 
> 3.  isPrototypeOf(object)：用于判断当前对象是否为另一个对象的原型。（第 8 章将详细介绍 原型。） 
> 4.  propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用（本章稍后讨 论的）for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。 
> 5.  toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。  toString()：返回对象的字符串表示。  valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

#### JSON

> 1. 基于文本的轻量级的数据格式。
>
> 2. JSON.stringify(value[, replacer [, space]])
>
>    `replacer` 可选 = 转化函数或者保留的属性数组。
>
>    `space` 可选 = 美化时的空格。
>
> 3. 转化循环对象和bigint时报错
>
> 4. 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
>
> 5. `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
>
> 6. 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
>
> 7. Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
>
> 8. NaN 和 Infinity 格式的数值及 null 都会被当做 null。
>
> 9. 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
>
> .

#### script延迟加载

> defer属性 推迟下载 
>
> - 具有 `defer` 特性的脚本不会阻塞页面。
> - 具有 `defer` 特性的脚本总是要等到 DOM 解析完毕，但在 `DOMContentLoaded` 事件之前执行。
> - **具有 `defer` 特性的脚本保持其相对顺序执行，就像常规脚本一样。**
>
> async属性 立即下载但不阻塞
>
> - 浏览器不会因 `async` 脚本而阻塞（与 `defer` 类似）。
>
> - 其他脚本不会等待 `async` 脚本加载完成，同样，`async` 脚本也不会等待其他脚本。
>
> - ```
>   DOMContentLoaded
>   ```
>
>   和异步脚本不会彼此等待：
>
>   - `DOMContentLoaded` 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
>   - `DOMContentLoaded` 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）
>
> create Element动态创建
>
> 使用 setTimeout 延迟方法
>
> 如果MIME类型不是 JavaScript 类型（上述支持的类型），则该元素所包含的内容会被当作数据块而不会被浏览器执行。

#### fetch

```js
Promise<Response> fetch(input[, init]);
```

> 当遇到网络错误时，`fetch()` 返回的 promise 会被 reject，并传回 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，虽然这也可能因为权限或其它问题导致。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 属性为 true。HTTP 404 状态并不被认为是网络错误。
>
> 为了在当前域名内自动发送 cookie ， 必须提供这个选项credentials

#### 浏览器缓存

>  **缓存字段：**
>
> 通用首部：cache- control、pragma
>
> 请求首部：if-math、if-none-math、if-modified-since、if-unmodified-since
>
> 响应首部：Etag
>
> 实体首部：expires、last-modified
>
> **强缓存和协商缓存**：
>
> 强缓存：：Expires&Cache-Control
>
> 协商缓存：Last-Modified&if-modified-since ||  if-none-math&Etag
>
> 协商缓存跟强缓存不一样，强缓存不发请求到服务器，**所以有时候资源更新了浏览器还不知道，但是协商缓存会发请求到服务器**，所以资源是否更新，服务器肯定知道。
>
> 强缓存时，浏览器在接收到这个资源后，会把这个资源连同所有response header一起缓存下来（所以缓存命中的请求返回的header并不是来自服务器，而是来自之前缓存的header）。
>
> expires设置一个绝对的时间，如果过期就重新获取。缺点：服务器时间与客户端时间相差较大时，缓存管理容易出现问题。
>
> cache-control:max-age，相对时间
>
> last-modified：首次请求时发送文件最后修改时间。再次请求时将这个时间设置给if- modified-since检测是否命中协商缓存。如果命中则响应里不返回last-modified，且状态码为304。缺点：有些文件修改了但是last- modified并没有修改。
>
> Etag：文件修改后会生成一个标识，首次请求时发送当前文件标识，再次请求时将这个标识设置给if-none-math检测是否命中协商缓存，不管命中与否都会返回一个新的Etag，因为每次生成的都不一样。
>
> 

![浏览器缓存判断流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/8/165b74d0e55dda0b~tplv-t2oaga2asx-watermark.awebp)

#### 解决浏览器缓存问题

> 根据缓存原理可以设置如下方案：
>
> 请求header设置cache-control：no-cache,max-age=0,no-store  设置if-modified-since:0,if-none-mach:''
>
> url的query上添加随机的字符串或者加上时间戳

#### js是同步非阻塞的

> 同步阻塞：小明一直盯着下载进度条，到 100% 的时候就完成。
>
> 同步非阻塞：小明提交下载任务后就去干别的，每过一段时间就去瞄一眼进度条，看到 100% 就完成。（轮询）
>
> 异步阻塞：小明换了个有下载完成通知功能的软件，下载完成就“叮”一声。不过小明仍然一直等待“叮”的声音（看起来很傻，不是吗最蠢）
>
> 异步非阻塞：仍然是那个会“叮”一声的下载软件，小明提交下载任务后就去干别的，听到“叮”的一声就知道完成了。（最机智）

#### 同源策略

> **同源策略**是一个重要的安全策略，它用于限制一个[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
>
> 资源请求，图片 url link ，js交互
>
> 如果两个 URL 的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)、[port (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Port) (如果有指定的话)和 [host](https://developer.mozilla.org/zh-CN/docs/Glossary/Host) 都相同的话，则这两个 URL 是*同源*。
>
> 满足某些限制条件的情况下，页面是可以修改它的源。脚本可以将 [`document.domain`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain) 的值设置为其当前域或其当前域的父域。
>
> 同源策略控制不同源之间的交互，例如在使用[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [`img`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 标签时则会受到同源策略的约束。
>
> 跨域写如表单、资源嵌入如link一般允许，跨域读一般不允许。

#### 跨域资源共享CORS

> `跨源资源共享` ([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS))（或通俗地译为跨域资源共享）是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其它[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（域，协议和端口），这样浏览器可以访问加载这些资源。
>
> 什么情况下需要 CORS ？
>
> 这份 cross-origin sharing standard 允许在下列场景中使用跨站点 HTTP 请求：
>
> - 前文提到的由 XMLHttpRequest 或 Fetch APIs 发起的跨源 HTTP 请求。
> - Web 字体 (CSS 中通过 @font-face 使用跨源字体资源)，因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
> - WebGL 贴图
> - 使用 drawImage 将 Images/video 画面绘制到 canvas。
> - 来自图像的 CSS 图形
>
> 简单请求不会触发cors预检查
>
> “需预检的请求”要求必须首先使用 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。
>
> 携带身份凭证的请求需要响应中携带 [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true`，否则请求将无法获取响应
>
> 响应首部
>
> ```js
> Access-Control-Allow-Origin: <origin> | *
> ```
>
> 服务器允许的源，携带凭证时无法为*
>
> ```js
> Access-Control-Allow-Headers: <headers> | *
> ```
>
> 请求允许携带的首部，携带凭证时无法为*
>
> ```js
> Access-Control-Allow-Methods: <methods> | *
> ```
>
> 服务器允许的方法，携带凭证时无法为*
>
> ```js
> Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
> ```
>
> 允许客户端获取的首部
>
> ```js
> Access-Control-Max-Age
> ```
>
> 预请求有效期，浏览器有一个自己的有效期
>
> ```js
> Access-Control-Allow-Credentials
> ```
>
> 允许携带身份凭证时读取响应
>
> 请求首部
>
> ```js
> Origin
> ```
>
> 请求的源
>
> ```js
> Access-Control-Request-Method
> ```
>
> 请求的方法
>
> ```js
> Access-Control-Request-Headers
> ```
>
> 请求的首部

#### 解决跨域

> jsonp
>
> nginx代理转发
>
> document.domain+iframe
>
> postMessage
>
> 跨域资源共享（CORS)
>
> node服务器 中间层
>
> WebSocket跨域

#### Cookie

> HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器维护会话状态信息的数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
>
> Cookie 主要用于以下三个方面：
>
> - 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
> - 个性化设置（如用户自定义设置、主题等）
> - 浏览器行为跟踪（如跟踪分析用户行为等） 
>
> 跨域下不会自动发送，除非显示设置需要响应中携带 [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true`，否则请求将无法获取响应响应首部。
>
> expires 过期时间，path 可用路径，domain 可用域名，secure 仅在https下传输，HttpOnlyjs不可读取，
>
> 

#### 模块开发

> 将代码拆分成独立的块，然后再把这些块连接起来可以通过模块模式来实现。这种模式背后的思想 很简单：把逻辑分块，各自封装，相互独立，每个块自行决定对外暴露什么，同时自行决定引入执行哪 些外部代码。
>
> ES6 之前的模块有时候会使用函数作用域和立即调用函数表达式 （IIFE，Immediately Invoked Function Expression）将模块定义封装在匿名闭包中。
>
> 所有模块都会像<script defer>加载的脚本一样按顺序执行。解析到<script type="module">标签后会立即下载模块文件，但执行会延迟到文档解析完成。
>
> 嵌入的模块定义代码不能使用 import 加载到其他模块。只有通过外部文件加载的模块才可以使用 import 加载。因此，嵌入模块只适合作为入口模块。
>
> Node.js是commonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。同步的。
>
> AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
>
> 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
> 2. ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。 
> 3. CommonJS 模块是运行时加载，ES6 模块 是编译时输出接口。

#### 垃圾回收

> 1. 标记清理，对所有的对象进行标记，并对上下文中的变量清除标记，在此之后如果重新标记了则清除。
> 2. 引用计数，当某个引用值被赋值给一个变量时，对当前引入值的计数+1，当数量为0时则清除。
> 3. v8垃圾回收，基于分代回收机制
>    1. 空间分为新老两个空间，新空间存短时间对象，老空间存长时间对象。
>    2. 新空间分为from和to空间，from空间存对象，to空间闲置。
>    3. form空间满之后，进行垃圾回收：检查form对象是否存活，否则清除，是则判断满不满足晋升到老空间（是否之前经历过回收、to空间是否使用超过25%），满足晋升，不满足放到to空间。然后把to空间复制到form空间。
>    4. 老空间对象使用标记清理+整理的方式。

#### windows.history

> ```js
> history.pushState(state, title[, url])
> ```
>
> `window.onpopstate`是`popstate`事件在window对象上的事件处理程序.
>
> **注意：**调用`history.pushState()`或者`history.replaceState()`不会触发popstate事件. `popstate`事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用`history.back()、history.forward()、history.go()`方法)，此外，a 标签的锚点也会触发该事件.
>
> 一般的history模式下会手动出发popstate事件。

#### 移动端适配

> 尺寸不是宽高，而是屏幕对角线的长度。
>
> 用英寸描述屏幕的物理大小，如电脑显示器的`17`、`22`，手机显示器的`4.8`、`5.7`等使用的单位都是英寸。
>
> 屏幕分辨率指一个屏幕具体由多少个像素点组成。`图片分辨率`其实是指图片含有的`像素数`，比如一张图片的分辨率为`800 x 400`。这表示图片分别在垂直和水平上所具有的像素点数为`800`和`400`。
>
> `PPI(Pixel Per Inch)`：每英寸包括的像素数。
>
> `DPI(Dot Per Inch)`：即每英寸包括的点数。
>
> 实际上，上面我们描述的像素都是`物理像素`，即设备上真实的物理单元。
>
> 我们必须用一种单位来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少，这个单位就是设备独立像素(`Device Independent Pixels`)简称`DIP`或`DP`。
>
> 设备像素比`device pixel ratio`简称`dpr`，即物理像素和设备独立像素的比值。
>
> 布局视口(`layout viewport`)：当我们以百分比来指定一个元素的大小时，它的计算值是由这个元素的包含块计算而来的。当这个元素是最顶级的元素时，它就是基于布局视口来计算的。

####  深拷贝

```js
const isArray = arr => Array.isArray(arr)
const isObj = obj => Object.prototype.toString.call(obj) === '[object Object]'
const deepCopy = obj => {
	if (!isArray(obj) && !isObj(obj)) return obj
	let copy = isArray(obj) ? [] : {}
	Object.entries(obj).forEach(([k, v]) => (copy[k] = deepCopy(v)))
	return copy
}
deepCopy({ a: 1, b: { c: 2 }, d: [1, 2, 3, 4] })		
```

#### bind、call、apply

```js

const myCall = (context, handler, ...  ) => {
	if (typeof context === 'bigint') context = BigInt(context)
	if (typeof context === 'number') context = new Number(context)
	if (typeof context === 'boolean') context = new Boolean(context)
	if (typeof context === 'string') context = new String(context)
	if (context === null || context === undefined) context = globalThis
	let key = Math.random().toString(36).slice(2, 6)
	context[key] = handler
	const result = context[key](...args)
	delete context[key]
	return result
}

const myBind = (context, handler,...args0) => {
	return function (...args1) {
		myCall(context, handler,...,args0 ...args1)
	}
}	
```

#### virtual DOM

> 

#### Promise

> 不同于“老式”的传入回调，在使用 Promise 时，会有以下约定：
>
> - 在本轮 [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#执行至完成) 运行完成之前，回调函数是不会被调用的。
> - 即使异步操作已经完成（成功或失败），在这之后通过 [`then()` ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)添加的回调函数也会被调用。
> - 通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序进行执行。
>
> `then()` 函数会返回一个和原来不同的**新的 Promise**：
>
> 

#### React

> 在浏览器每一帧的时间中，预留一些时间给JS线程，`React`利用这部分时间更新组件（可以看到，在[源码 (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)中，预留的初始时间是5ms）。
>
> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）
>
> 我们日常使用App，浏览网页时，有两类场景会制约`快速响应`：
>
> - 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
> - 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。
>
> 这两类场景可以概括为：
>
> - CPU的瓶颈
> - IO的瓶颈
>
> 解决`CPU瓶颈`的关键是实现`时间切片`，而`时间切片`的关键是：将**同步的更新**变为**可中断的异步更新**。
>
> `React Fiber`可以理解为：
>
> `React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。
>
> 在React16中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，
>
> 其中每个任务更新单元为`React Element`对应的`Fiber节点`。
>
> `Fiber`包含三层含义：
>
> 1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
> 2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
> 3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。
>
> **在内存中构建并直接替换**的技术叫做[双缓存 (opens new window)](https://baike.baidu.com/item/双缓冲)。即先在内存构建好新ui，构建完成后直接替换。
>
> `React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新
>
> ## 双缓存Fiber树
>
> 在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。
>
> 从`React`v16开始，`componentWillXXX`钩子前增加了`UNSAFE_`前缀。
>
> 究其原因，是因为`Stack Reconciler`重构为`Fiber Reconciler`后，`render阶段`的任务可能中断/重新开始，对应的组件在`render阶段`的生命周期钩子（即`componentWillXXX`）可能触发多次。
>
> 可见，`useEffect`异步执行的原因主要是防止同步执行时阻塞浏览器渲染。
>
> ```js
> // App组件对应的fiber对象
> const fiber = {
>   // 保存该FunctionComponent对应的Hooks链表
>   memoizedState: null,
>   // 指向App函数
>   stateNode: App
> 
> 
> };
> ```
>
> Concurrent 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。
>
> 从源码层面讲，Concurrent Mode是一套可控的“多优先级更新架构”。
>
> 底层 

#### 迭代器、生成器

> 迭代器模式（特别是在 ECMAScript 这个语境下）描述了一个方案，即可以把有些结构称为“可迭 代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费。

#### Proxoy

> 之所以 Vue3.0 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。
>
> 

#### 内置对象

>  js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。

#### css工程化

> CSS 工程化是为了解决以下问题：
>
> 1. **宏观设计**：CSS 代码如何组织、如何拆分、模块结构怎样设计？
> 2. **编码优化**：怎样写出更好的 CSS？
> 3. **构建**：如何处理我的 CSS，才能让它的打包结果最优？
> 4. **可维护性**：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

#### position

> static，relative，absolute，fixed，sticky
>
> fixed `fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform`, `perspective` 或 `filter` 属性非 `none` 时，容器由视口改为该祖先。
> 
> 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。
>该值总是创建一个新的层叠上下文（stacking context）。注意，一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见Github issue on W3C CSSWG）。

#### z-index层叠上下文

> 页面元素不仅会在xy轴上排列，在z轴上也会进行排列。默认的元素排列顺序是背景、z-index负数、display block、浮动、inline- block、z-index0、z-index0。
>
> 产生层叠上下文的有：根元素、absolute设置z-index、fixed、sticky、opacity、transform、filter、flex、grid子元素设置z-index。
>
> 层叠上下文和层叠顺序是两回事 
>
> - CSS2.1规范中，只在定位元素position上有效（非static）
> - z-index值改变元素在其parent stacking context中Z轴的相对偏移量
> - 根节点、position！=static 、flex ｜grid子元素、opacity、transform、filter

#### BFC

> 格式化上下文，是css中的一种规则，开启以后拥有独立的布局，可以解决浮动高度塌陷、上下边距合、排除外部浮动问题
>
> 根元素、position=absolute ｜fixed、flex｜grid的子元素、浮动、overflow不为visible、inline- block、表格、display=flow-root

#### Grid

> 与弹性盒子不同的是，在定义网格后，网页并不会马上发生变化。因为`display: grid`的声明只创建了一个只有一列的网格，所以你的子项还是会像正常布局流那样从上而下一个接一个的排布。

#### css动画

> transition delay、function、prototype、duration
>
> animation delay、name、function、duration、count、direction、mode、state 

