> http
>
> 分层。五层：应用、传输、网络、链路、物理。7层：应用、表达、会话、传输、网络、链路、物理。
>
> dns解析。检查缓存：浏览器、系统、路由、服务商。递归：查询根域名查询、顶级域名、目标域名。原理：dns是将域名和ip地址相互映射的一个命名系统。一般情况下使用udp因为快速、但是在响应报文超过udp的限制后会转为使用tcp。
>
> cdn，内容分发网络，负载均衡和分布式存储技术。流程：发起请求，网站dns解析。cdn dns解析、cdn全局负载均衡系统、区域负载均衡系统、判断服务器的距离、文件在那个服务器上，发送对应服务器给客户端。客户端想对应服务器请求数据。好处：数据拦截处理、加快数据获取、CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。
>
> tcp/udp。tcp提供稳定可靠的连接的通信传输，udp提供实时、高速的无连接的通信传输。TCP 是面向字节流的，而 UDP 是面向报文的。UDP 报文被限制在 512 字节以内。
>
> uri/url。uri 统一资源描述符，url统一资源定位符。
>
> 报文。首部、空行、主题。首部：请求行/状态行、首部、通用首部、实体首部。
>
> 内容协商：同一个url 根据accept相关的字段返回不同的文件。accept、language、chart、encoding。vary用于确定协商时用到的字段。协商方式：服务器、客户端、两者结合。
>
> 范围请求：用于音视频请求。
>
> 状态码。200:请求成功，201请求成功并创建了新的资源。204:请求成功无主体。206:范围请求。301永久重定向：此时保存时保存的是新资源，302临时重定向，303临时重定向，明确表明需要使用get请求新资源。304协商缓存。307临时重定向不会改变请求方式，，308永久重定向，但不会吧post转为get请求。400 数据请求格式不对，401无权限，403拒绝访问，404资源未找到，405请求方法错误。409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。500服务器错误，501---服务器不支持当前请求所需要的某个功能。503服务器停止工作。504超时，505---服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本。502 Bad Gateway 是一种 HTTP 协议的服务端错误状态代码，它表示作为网关或代理的服务器，从上游服务器中接收到的响应是无效的。
>
> 缓存：如果tab没关闭，先找内存缓存，再找硬盘缓存。强缓存：expire，实体首部，由服务器的绝对时间和本地时间比较，修改本地时间容易导致缓存失效。会缓存本次的response header。cache- control，通用首部，返回一个相对时间，根据第一次请求的时间加上相对时间和本次时间比较，判断是否命中缓存，缓存header。请求加上上次response的last modified为If-Modified-Since，比较服务器里文件上次的修改时间。命中缓存时不重新发送last modified，又是资源修改了但是时间没有变化。etag和if-none-match。etag是上次根据文件生成的签名。通过比对，命中后会再次发送etag 即使前后两次不一样。在分布式系统中，要保证last- modified 一致。尽量关闭etag 因为每个机器生产的etag不一样。
>
> cache-control：客户端：max-age、s-maxage、no-cache、no-store、mast-stale、mini- fresh、only-if-cached。服务端：max-age、s-maxage、no-cache、no-store、public、private、immutable、 must-revalidate、no- transform
>
> cookie。服务器发送给客服端的一个数据块，每次客户端请求时都会带 上这个数据，用于用户身份识别、和行为记录。安全前缀：_ _ secure _ _ ，使用secure，_  _host,使用secure、不可设置path和domain。由于secures可以被移除，但是前缀移除后无效。same site：none、lax、strict。lax 只有一些安全的跨域请求如get、a链接、预下载且url发生变化的请求才允许发送。same party。设置后 多个域名可以关联在一起，跨域请求时可以携带cookie。单条为4kb，有数量限制，多出来的cookie会被删除。priority可以设置删除的优先级。expire max-age path domain secure http only   none必须与secure一起使用 4kb
>
> none 必须和https一起、langx、strict。langx 运行部分安全的请求携带cookie，比如导航到目标网址的 Get 请求、a链接、预下载等
>
> get/post。get受限于浏览器有大小限制，get明文传输，只支持字符串编码，可以被缓存、保存、记录和浏览器会退。post支持多种数据格式、加密传输。本质上都是tcp的一次连接，不同的是根据语义个方面进行了限制，同时post在tcp链接是会发送两次数据，一次header，一次data。get 最大2kb
>
> 安全。
>
> 1. csrf跨域请求攻击。解决：开启samesite。使用token。验证origin、
> 2. xss 跨域脚本攻击，XSS攻击产生的影响主要有：盗取Cookie信息、监听用户行为、修改DOM、在页面内生成浮窗广告等。解决：对用户的输入数据进行编译，开启http-only，使用CSP
>
> 同源策略：安全策略，用于限制一个源对另外一个源的资源的操作。同源定义：协议、主机、端口。更改源：修改window.domain，可以通过父域名的验证。跨域访问：一般的写操作允许、资源的嵌入是允许的、读操作是不允许的。跨域嵌入资源：link、script、img、video、iframe、font- face。通过window.self、parent、top跨域访问。以及post message。
>
> CSP内容安全策略：开发者明确告诉客户端（制定比较严格的策略和规则），哪些外部资源是可以加载和执行的，1,一种是通过 HTTP 头信息的Content-Security-Policy的字段2.通过网页的`<meta>`标签
>
> cors 跨域资源共享：需要跨域的跨域get请求、一些font-face、css中的 shape-outside的图像图形的url图片、canvas下载图片。 简单请求：head、get、post。且只使用了特定的首部、accept、Content-Type 为text/plain、multiple、x-www-urlencode-，请求中没有注册事件监听。预请求：options 发送origin、request-header、method，返回access-control-allow header/method/origin/max-age。credentials，expose-header、max-age，origin、request-header/method。预请求重定向：服务器不重定向、改为简单请求、先用简单请求再用与请求。携带凭证：xhr开启with credentials、fetch开始credentials为include，然后返回access-control-allow- credentials。
>
> `OPTIONS`请求与`HEAD`类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的所有HTTP请求方法，该方法会用'*'来代替资源名称，向服务器发送`OPTIONS`请求，可以测试服务器功能是否正常。
>
> xhr vs fetchvsaxios：
>
> xhr使用步骤麻烦、兼容性好、支持取消操作和进度查询。
>
> fetch 基于promise的网络请求，配置简单，cookie不回主动加上，无法进度查询、只有网络错误才会报错，不能设置超时请求。将请求分为多个模块，req，res
>
> - 使用 promise，不使用回调函数。
> - 采用模块化设计，比如 rep、res 等对象分散开来，比较友好。
> - 通过数据流对象处理数据，可以提高网站性能。
>
> axios 基于promise分装的xhr
>
> - 从浏览器中创建 XMLHttpRequests
> - 从 node.js 创建 http 请求
> - 支持 Promise API
> - 拦截请求和响应
>
> - 转换请求数据和响应数据
> - 取消请求
> - 自动转换 JSON 数据
> - 客户端支持防御 XSRF
>
> fetch credentials:omit、include、same- origin。fetch mode：same-origin、cors、no-cors遵循简单请求的跨域、navigate表示页面切换的请求。
>
> 解决跨域。
>
> 1. dom层面：postmessage、修改windows.domain、windows.name、修改iframe的url、
> 2. 网络：jsonp、nginx代理、node 中间层、开启cors
>
> http1.0vshttp1.1：长链接、	管线化、长链接、新增状态码、新增缓存、内容协商、分块传输数据、新增请求方法。
>
> http1.1缺点：头部臃肿、高延迟、使用文本传输、不支持服务端推送、1、高延迟--带来页面加载速度的降低，2、无状态特性--带来的巨大HTTP头部，3、明文传输--带来的不安全性，4、不支持服务器推送消息
>
> http1.1vshttp2：二进制流传输数据、多路复用、头部压缩、请求流的优先级、双工通信、服务器推送；
>
> http2缺点：服务器压力提高、丢包时阻塞后续数据传输。某个帧超时时，其包含的请求都会超时。
>
> http1.1的多路复用：基于文本流，建立一个tcp长链接，在此连接上发送多个数据请求。管线化处理可以不用等待结果就发送下一个请求，但是如果头部阻塞了就会影响后续的请求。队头阻塞。可以开启多个tcp链接。
>
> http2多路复用：以二进制流来传输数据，把一个请求看成一个流，流又可以分为多个侦，每个流可以携带其他流的二进制侦，这样就可以不必等待删一个请求，实现了多路复用，但是如果某个流发生了超时，则会影响流上的二进制侦所在的流。单个链接里做的事情，
>
> http3：采用udp加偏移标识来传输数据。集成了TLS加密功能。给每个请求都添加一个流量窗口，解决队头阻塞问题。udp是无链接的所以不用握手和挥手。在初次链接时，只需要客户端服务器来回一次就能建立链接。之后可以利用上次回话的session key实现直接建立链接。每次链接都会重新设置一个新的sessionkey。并设置有效期时间。
>
> tcp如何保证可靠的连接：以最大消息长度传输数据保证数据不被分块。对每个进行编号，接收方对包进行排序。保持数据的校验和，在接受时比对校验和。以滑动窗口控制流量，超时重传。拥塞窗口进行拥塞控制。使用ARQ协议，发送一个包都要等待应答响应。
>
> `RTT（Round-Trip Time）`:往返时延。表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延。
>
> 滑动窗口：无需等待确认应答，而可以继续发送数据的最大值。超时数据不会重发
>
> 从url到页面。解析转译url。检查资源缓存、dns解析、tcp3次握手（发送syn包到服务器、服务器发送ack、客户端再次发送ack进行连接）为什么三次 保证双方都正常，避免资源浪费、tls协商加密、数据传输、客户端接受响应，tcp4次挥手（客户端发送fin到服务端，服务端ack，服务端发送fin。等待一段时间后，客户端ack，关闭连接）为什么四次因为tcp是半关闭的，一段关闭后还能接受数据。解析html，生成dom和cssom，组合生成render 树，元素进行布局计算、绘制像素、合并图层到页面。。
>
> 
>
> 预加载扫描器：在拿到HTML文档的时候，先扫描整个文档，把CSS、JS、图片和web字体等提前下载。 
>
> a ax  ax 
>
> by	by b
>
> cy c   cy c
>
> application/x-www-form-urlencoded 、multipart/form-data、application/json
>
> x-dns-prefetch-control 开启https的dns预解析 
>
> RESTful 互联网软件架构。 API 表现层状态转化
>
> （1）每一个URI代表一种资源；
>
> 　　（2）客户端和服务器之间，传递这种资源的某种表现层；
>
> 　　（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。
>
> **在设计API时，使用路径定位资源，方法定义操作，通过Content-Type和Accept来协商资源的类型**。
>
> ORM 是Object Relational Mapping 的缩写，译为“对象关系映射”框架。
>
> GraphQL 是一种**描述请求数据方法的语法**，
>
> - 它允许客户端指定具体所需的数据。
> - 它让从多个数据源汇总取数据变得更简单。
> - 它使用了类型系统来描述数据。
>
> host、referer和origin的区别
>
> 1. host只包含域名和端口，单台服务器设置多个虚拟主机时可以用来识别对应的虚拟主机。
> 2. referer包含完整的请求页面，常用来做防盗链，两种情况下不会转发：通过file或者data协议的数据，请求页为不安全协议，而来源是安全协议。
> 3. origin只会在预请求是出现，包含完整的域名地址。
>
> 





