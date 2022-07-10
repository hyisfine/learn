1. package type module 
2. 密码加密
3. jwt
4. mysql
5. orm
6. express.json
7. express.urlencoded
8. 中间件
   1. 应用中间件
   2. 路由中间件
   3. 内置中间件
   4. 错误处理中间件
   5. 第三方中间件
9. 流程：实例化express、调用中间件、匹配路由路径、建立监听
   1. 启动服务时会依次执行程序，将该路由系统中的路径、请求方法、处理函数进行存储（这些信息根据一定结构存储在 Router、Layer 和 Route 中）
   2. 对相应的地址进行监听，等待请求到达。
   3. 请求到达，首先根据请求的 path 去从上到下进行匹配，路径匹配正确则进入该 Layer，否则跳出该 Layer。
   4. 若匹配到该 Layer，则进行请求方式的匹配，若匹配方式匹配正确，则执行该对应 Route 中的函数。
10. express-app- router-( layer- (route- layer-layer。。。)循环)
11. 流程：
    1. 初始化：app.use、app.lazyRouter、new Router、router.use、new Layer、router.method、router.route、new Layer、new Route、route.method、new Layer。
    2. 监听：app.listen、app.handle、router.handle、layer.handle_request、route.dispatch、layer.handle_request
12. 间件函数可以执行以下任务：
    - 执行任何代码。
    - 对请求和响应对象进行**更改**。
    - 结束请求/响应循环。
    - 调用堆栈中的下一个中间件函数。
13. PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。



