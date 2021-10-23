1. http：Hypertext Transfer Protocol  超文本传输协议
2. 初期标准：https://www.ietf.org/rfc/rfc1945.txt 
3. 1.1标准：https://www.ietf.org/rfc/rfc2616.txt
4. 使用 HTTP 协议，每当有新的请求发送时，就会有对应的新响应产生。协议本身并不保留之前一切的请求或响应报文的信息，即无状态（stateless）协议。
5. URL（UniformResource Locator，统一资源定位符）。
6. URI 是 Uniform Resource Identifier 的缩写，统一资源标识符。
7. http方法：
    1. GET ：获取资源
    2. POST：传输实体主体
    3. PUT：传输文件
    4. HEAD：获得报文首部
    5. DELETE：删除文件
    6. OPTIONS：询问支持的方法
    7. TRACE：追踪路径
    8. CONNECT：要求用隧道协议连接代理
8. REST（REpresentational State Transfer，表征状态转移）标准
9. HTTP 协议的初始版本中，每进行一次 HTTP 通信就要断开一次 TCP连接。
10. HTTP/1.1 和一部分的 HTTP/1.0 想出了持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或HTTP connection reuse）的方法。持久连接的特点是，只要任意一端没有明确提出断开连接，则保持TCP 连接状态。
11. 持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。
12. cookie技术是为了解决http无状态的方法。通过在请求和响应的报文中加入cookie来控制状态。
13. 响应报文中的Set-Cookie字段设置cookie。
14. 用于 HTTP 协议交互的信息被称为 HTTP 报文。请求端（客户端）的HTTP 报文叫做请求报文，响应端（务器端）的叫做响应报文。HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文本。
15. MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件扩展）机制。
16. 在 MIME 扩展中会使用一种称为多部分对象集合（Multipart）的方法，来容纳多份不同类型的数据。
17. multipart/form-data 在 Web 表单文件上传时使用。
18. multipart/byteranges状态码 206（Partial Content，部分内容）响应报文包含了多个范围的内容时使用。
19. 指定范围发送的请求叫做范围请求（Range Request）。执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。5001~10 000 字节 Range: bytes=5001-10000。针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。另外，对于多重范围的范围请求，响应会在首部字段 Content-Type 标明 multipart/byteranges 后返回响应报文。
20. 内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的基准。服务器驱动协商（Server-driven Negotiation）,客户端驱动协商（Agent-driven Negotiation）,透明协商（Transparent Negotiation）。
21. 当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把POST 改成 GET，并删除请求报文内的主体，之后请求会自动再次发送。
22. 在互联网上，域名通过 DNS 服务映射到 IP 地址（域名解析）之后访问目标网站。可见，当请求发送到服务器时，已经是以 IP 地址形式访问了。
23. 通信数据转发程序 ：代理、网关、隧道。
24. 每次通过代理服务器转发请求或响应时，会追加写入 Via 首部信息
25. 使用代理服务器的理由有：利用缓存技术（稍后讲解）减少网络带宽的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要目的，等等。
26. 网关的工作机制和代理十分相似。而网关能使通信线路上的服务器提供非 HTTP 协议服务。
27. 首部字段 Cache-Control 能够控制缓存的行为。
28. 从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为 do-notserve-from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存。
29. 若报文首部字段 Cache-Control 中对 no-cache字段名具体指定参数值，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。
30. 当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时间。
31. Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段。
32. 相同的 IP 地址下部署运行着多个域名，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段 Host 来明确指出请求的主机名。
33. ，一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的 Cookie，实现对客户端 Cookie 的实质性删除操作。
34. 即使已经过加密处理的通信，也会被窥视到通信内容，这点和未加密的通信是相同的。只是说如果通信经过加密，就有可能让人无法破解报文信息的含义，但加密处理后的报文信息本身还是会被看到的。
35. 即使是无意义的请求也会照单全收。无法阻止海量请求下的 DoS 攻击（Denial of Service，拒绝服务攻击）。
36. ，请求或响应在传输途中，遭攻击者拦截并篡改内容的攻击称为中间人攻击（Man-in-the-Middle attack，MITM）。
37. HTTP 主要有这些不足，例举如下。
    1. 通信使用明文（不加密），内容可能会被窃听
    2. 不验证通信方的身份，因此有可能遭遇伪装
    3. 无法证明报文的完整性，所以有可能已遭篡改
38. HTTP+ 加密 + 认证 + 完整性保护=HTTPS
39. SSL（Secure Socket Layer，安全套接层）
40. TLS（Transport Layer Security，安全层传输协议）
41. HTTPS 并非是应用层的一种新协议。只是 HTTP 通信接口部分用SSL（Secure Socket Layer）和 TLS（Transport Layer Security）协议代替而已。
42. 通常，HTTP 直接和 TCP 通信。当使用 SSL 时，则演变成先和 SSL 通信，再由 SSL 和 TCP 通信了。
43. 加密和解密同用一个密钥的方式称为共享密钥加密（Common keycrypto system），也被叫做对称密钥加密。
44. 证书的一个作用是用来证明作为通信一方的服务器是否规范，另外一个作用是可确认对方服务器背后运营的企业是否真实存在。拥有该特性的证书就是 EV SSL 证书（Extended Validation SSLCertificate）。
45. 和使用 HTTP 相比，网络负载可能会变慢 2 到 100 倍。除去和TCP 连接、发送 HTTP 请求 • 响应以外，还必须进行 SSL 通信，因此整体上处理通信量不可避免会增加。另一点是 SSL 必须进行加密处理。在服务器和客户端都需要进行加密和解密的运算处理。因此从结果上讲，比起 HTTP 会更多地消耗服务器和客户端的硬件资源，导致负载增强。
46. HTTP/1.1 使用的认证方式如下所示。
    1. BASIC 认证（基本认证）
    2. DIGEST 认证（摘要认证）
    3. SSL 客户端认证
    4. FormBase 认证（基于表单认证）
47. 使用 SPDY 后，HTTP 协议额外获得以下功能。
    1. 多路复用流
    2. 赋予请求优先级
    3. 压缩 HTTP 首部
    4. 推送功能
    5. 服务器提示功能
48. WebSocket 协议的主要特点。
    1. 推送功能







