# vite hmr原理分析

**本文旨在分析vite hmr的实现原理，并附上相关官方源码地址和官网地址。**



**hmr有两种解释，一种是hot module refresh，模块热更新，指的是监听文件的变化，重新编译文件然后告诉前端刷新整个页面。另一种就是我们今天说的hot module replacement，模块热替换，指的是监听文件的变化，重新编译文件，告诉前端更新的文件，重新加载此文件。**



### 实现原理

**Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式服务源码，只需要在浏览器请求源码时先进行转换再返回转换后的源码。基于这种方式，vite hmr的实现要比webpack的hrm实现更简单更快速。**

**大致过程是：**

1. 创建一个websocket服务端。
2. 创建一个websocket客户端，并在index.html中引入，接受服务端信息。
3. 服务端监听文件变化，发送websocket消息，告诉客户端变化类型，变化文件等。
4. 客户端接受到消息，根据消息内容决定重新刷新页面还是重新加载变化文件。



### 源码分析

#### 创建一个websocket服务端。

