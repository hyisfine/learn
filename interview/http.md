1. TCP/IP 层级：应用层（html、http）、传输层（TCP、UDP）、网络层（IP、ARP）、网卡层、硬件层
2. OSI层级：应用、表示、会话、传输、网络、数据链路、物理
3. 数据包在每一层都会携带相应的首部
4. MAC地址：网卡物理身份
5. IP协议：主要负责将数据包发送给最终的目标计 算机。
    1. IP地址 用于在“连接到网络中的所有主机中识别出进行通信的目标地址”
    2. IP面向无连接。即在发包之前，不需要建立与对端目标地址之间 的连接。上层如果遇到需要发送给IP的数据，该数据会立即被压缩成 IP包发送出去。
6. DNS域名解析系统.    
    1. 检查浏览器缓存
    2. 检查系统缓存
    3. 向本地dns系统服务器发起查询，检查缓存
    4. 向根域名发起请求
    5. 向顶级域名系统发起请求
    6. 向权限域名服务器发起请求
7. TCP/UDP
    1. TCP提供可靠的、面向连接的流协议通信传输，主要用于可靠的
    2. UDP不具有可靠的数据报协议，用于高速传输、实时性的通行
8. 数据链路和IP中的地址，分别指的是MAC地址和IP地址。前者用 来识别同一链路中不同的计算机，后者用来识别TCP/IP网络中互连的 主机和路由器。在传输层中也有这种类似于地址的概念，那就是端口 号。端口号用来识别同一台计算机中进行通信的不同应用程序。
9. UDP 用户数据报协议、无连接、实时性、用于音视频、广播、数据少的协议
10. TCP 面向有连接的，用于有效性、可靠性
11. TCP连接：
      1. 发送确认应答ACK，如果无应答，则重发
      2. 通过序列号，实现重发控制、应答处理、重复控制
      3. 客户端发送SYN包，服务端发送ACK，客户端发送ACK，客户端发送FIN请求切段连接，服务端ACK，服务端FIN，客户端ACK
12. URI统一资源标识符、URL统一资源定位符
13. 报文：首部、空行、主体
14. 响应报文首部：请求行/状态行、通用首部、请求/响应首部、主体首部
15. 内容协商：相同的URL根据不同的accept资源类型返回不同的资源
      1. 字段：accept可使用的MIME类型，accept-language、charts、encoding、content-language，vary，协商使用的首部字段
      2. 协商方式：服务器协商、客户端协商、两者结合
16. 范围请求
      1. 可恢复机制，请求资源的一个范围，range字段
17. 状态码
      1. 200 成功、204成功但是没有主体、206成功返回range范围请求的数据
      2. 301永久重定向、保存资源时会保存重定向后的url。302临时重定向。303临时重定向，指明资源需要使用get请求获取。304，协商缓存，307临时重定向且不会更改请求方法。301～303会把post改为get且删除原请求的主体。
      3. 400 客户端请求错误。401无权限，403拒绝访问，404资源未找到。
      4. 500服务器错误。503服务器停止。
18. 缓存
      1. 强缓存：expire，http1.0，服务器的绝对时间。cache-control，相对客户端时间。
      2. 协商缓存。last-modified，服务器文件上次修改时间。if-modified-since。客户端返回的时间，etag，文件修改标识，**If-None-Match**文件为修改标识
      3. cache-control，max-age 过期时间，s-maxage代理服务器的缓存max-stale，过期后多少时间还能用，-mini-fresh返回多少时间内产生的新 的资源。must-revalidate，需要重新验证缓存，max-age，immutable，资源在过期前都不用验证缓存。public，可缓存的，即使未设置缓存或者不可缓存的资源也可以缓存，比如未设置expire，max-age，后者post请求。private ，仅最终用户可以缓存。on-cache 使用之前需要进行缓存验证。no-store 不进行缓存
19. cookie
      1. 参数，name=value。path/=使用的路径，expires，max-age，domain，http-only，secure，sameSite。site-party，Priority
      2. 安全前缀，__ Secure，开启secure，  __ Host开启secure且path=/，且不能设置 Domain 属性。因为 `Secure` 属性设置后是可以被人恶意移除的，而 Cookie 名称被人移除前缀，服务器不会认它，所以更加安全。
      3. max-age的优先级比expire高
      4. Same-site none，strict，lax，chrome80之后默认为lax，请求与请求所在的原非源时的cookie转发。lax，安全的请求且url变化下可以转发cookie，安全请求：一般是get请求，但是image个iframe不转发/
      5. 单条cookie一般为4kb，且数量有限制，如果超过数量。旧的会被删除。可以设置Priority
      6. xhr 设置withCrendential,fetch设置credentials。同时需要设置access-control-allow-credentials。
      7. script设置crossorigin可以获取到跨域的js的错误信息
20. get-post区别
      1. get 可以 被浏览器缓存、保存、记录、回退时不会再次发送请求。
      2. get明文传输
      3. get大小根据浏览器duiurl的限制有限制
      4. get只支持ascii编码
      5. 本质都是TCP的连接。不过由于在语意上的区别，浏览器和http协议进行了限制，同时get在发送数据包时，会将data和header一同发送，而post会发两次，一次header一次data
21. 前端安全
      1. xss 跨域脚本攻击。简单的说就是由于用户的输入/添加资源到当前网站里，导致这些资源数据里有可以执行的js代码，从而实现在当前网站里直接操作js取cookie的操作。解决方法时使用http-only，对用户的输入进行转译
      2. csrf 跨域请求攻击，简单的说就是用户在访问某个网站时，根据某些操作向之前自己登陆过的网站发送请求的操作。由于cookie会携带同源，防范方法，使用token，使用samesite。
      3. 当请求返回里只有数组时，添加{[]前缀。
22. cookie、token、session
      1. cookie是浏览器的状态管理机制，可以设置相关的参数。同源请求时会自动带上/
      2. ssession则是服务器对当前的用户生成个记录。同时返回给用户。根据用户再次请求时判断当前session是否存在，
23. 同源策略，浏览器限制一个源的脚本和文档如果与另一个源的脚本、资源进行交互。
      1. 同源：相同协议、域名、端口
      2. 跨域访问，一般写操作都可以，还有image、iframe获取、字体可以跨域也可以不跨域
24. cors 跨域资源共享
      1. 跨域情况：非普通请求、资源请求添加了crossorigin、canvas下载图片、
      2. 普通请求：get、head、Post、使用了accept字段。content-type为text/plain、请求中为监听请求状态事件。
      3. 响应首部
          1. access-control-allow-origin:允许的源
          2. access-control-allow-method:允许的方法
          3. access-control-allow-header:允许的头部
          4. access-control-expose-header:允许的访问的头部
          5. access-control-max-age:与请求有效期
          6. Access-control-allow-credentials:设置了Credentials时是否允许浏览器获取到响应数据
      4. 请求首部
          1. access-control-request-method:允许的方法
          2. access-control-request-header:字段
          3. origin请求源
25. 从url到渲染
      1. url转码，浏览器只能识别ascii和部分保留字符。encodeuri encodeuri component
      2. 缓存。强缓存expire cache- control 。协商缓存last- modified if- modified- since，etag，if-none- match。
      3. dns解析，浏览器缓存，系统缓存、路由器缓存、服务商缓存、根域名系统查询。
      4. tcp3次握手。客户端发送syn（同步）包到服务器，服务器发送ack（承认），客户端发送ack。为什么三次？服务器发送成功后，等客户端再次发送后再链接，避免超时导致的资源浪费。
      5. tls协商加密握手。对称加密快但密钥传输过程不安全。非对称加密安全但是慢。协商加密，链接阶段使用非对称，传输中使用对称。1客户端发送随机数和加密方式给服务器，服务器发送随机数和证书。客户端验证证书并根据服务端生成一个随机数。根据双方得到的3个随机数加密。
      6. 接受响应。响应报文，响应头请求头、首部、主体。post get区别。
      7. 关闭tcp，4次挥手，客户端fin包，服务端ack，服务端fin，客户端ack，等待一段时间，关闭。4次原因，双向链接，存在我发完了你没法玩的情况，等待原因，kennel在发送ack后超时，服务端继续发送。
      8. 浏览器渲染。构建dom树，构建cssom树。cs是异步不阻塞，js阻塞。css不阻塞html解析，但是会阻塞js执行，js又会阻塞html解析。
      9. 计算布局定位。渲染像素。
      10. 优化。缓存、dns预解析。preload 预下载 prefetch 预加载。减少回流重绘。
26. http1.1 vs http2
      1. 长链接，基于文本，管线化多个请求，但是有限制，队头阻塞。多tcp并行链接。
      2. 基于二进制流传输，多路复用，将多个request的部分请求封装为一个流，在接送端进行组装。设置优先级。服务端推送。header压缩，维护一个字典，将首都映射为一个字符。