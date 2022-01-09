# Preact 源码学习笔记（一）：测试源码环境搭建

> 缘由： `preact`作为`react`的轻量型替代品，号称只有3kb～，其实一直想看他的源码和react源码进行比较，不过一直没机会，趁着过年前，花点时间把源码给整理一下。



作为了preact源码的开篇，主要做些准备工作，以便之后源码的学习及相关功能的调试。

**注意⚠️：涉及的相关技术知识只做基础科普，不太明白的我都给出了相关的官网文档和源码，方便查看。**

**按照一贯作风，笔记里我将会大部分引用官方文档和源码，我始终觉得官网给出的才是最合理最正确的。**



## babel 转换jsx

### 什么是babel？

Babel 是一个 JavaScript 编译器Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版浏览器或环境中向后兼容的 JavaScript 版本。

[官网在这里。](https://www.babeljs.cn/docs/)强烈推荐官网给出的babel转换原理demo：[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)，看完基本上可以理解babel的工作原理了。

### 什么是jsx？

jsx是一个 JavaScript 的语法扩展。巴拉巴拉，[官方文档在此。](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

### 如何转换

babel的[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-react)预设功能支持将jsx文件转为相应的createElement的函数，实际上主要的转换功能是由[@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)插件完成的。我们可以配置一个简单的babel来实现这个功能：

1. 创建自己的测试文件夹

2. 执行命令：

   ```bash
   npm i -D @babel/core @babel/cli @babel/plugin-transform-react-jsx
   ```

   @babel/core：babel核心功能，@babel/cli：babel命令行工具，这些都在官网里有解释，还不清楚的快去看。

3. 配置babel.config.json文件：

   ```json
   {
       "plugins": [
           [
               "@babel/plugin-transform-react-jsx",
               {
                   "runtime": "automatic",
                 	"importSource": "preact"
               }
           ]
       ]
   }
   
   ```

4. 创建一个index.jsx文件，随便写点jsx代码：

   ```react
   const App = () => <div>preact app</div>
   ```

5. 执行命令：

   ```bash
   npx babel index.jsx -o index.js 
   ```

   `npx babel`其实调用的是`./node_modules/.bin/babel`，这是npm的功能之一，也可以在[babel官网](https://www.babeljs.cn/docs/usage#%E6%A6%82%E8%A7%88)看到使用。

可以看到已经产生了一个index.js文件了：

```javascript
import { jsx as _jsx } from 'preact/jsx-runtime'

const App = () =>
	_jsx('div', {
		children: 'preact app',
	})
```

**注意⚠️：已经看过其他代码转化的同学可能会疑惑，为什么没有转换为熟悉的`React.createElement`函数，而是`_jsx`函数？**

这其实是新的jsx转换方式（都一年半了也不算太新。。。），在[react博客](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)中提及了，建议看完。它由`@babel/plugin-transform-react-jsx`的参数 "runtime": "automatic"决定的，runtime有两个参数：classic | automatic，classic就是转换为React.createElement函数的模式。

**"importSource"设置为"preact"，即可修改preact为默认的库名。**



## 准备测试环境

学习源码最好的方式个人觉得是**把源码带入demo中进行测试。**所以让我们来搭建一个可以调试preact源码的测试环境。

### 一、clone preact的源码到本地。

`preact`的源码目录结构有点诡异。。。不过还好，[源码里的CONTRIBUTING.md文件](https://github.com/preactjs/preact/blob/master/CONTRIBUTING.md#user-content-the-repo-structure)里有讲解相关的文件和相关的文件夹作用。快去看 看完就明白了。

clone之后，执行`npm  i`，之后打开package.json，我们可以看到它的相关script。

### 二、创建demo项目

preact 也有一个[preact-cli](https://preactjs.com/cli/getting-started)可以帮助我们快速的构建一个preact项目。

执行命令：

```bash
npx preact-cli create
```

然后填入相关信息即可。

**注意⚠️：进入目录后不要先执行 `npm i`.**

### 三、关联preact到demo项目

#### 相关库

我们使用`yalc`+`nodemon`进行依赖库关联。

使用`yalc`可以比npm link更方便我们进行依赖库联调，相关使用可以查看[yalc官网](https://github.com/wclr/yalc)，或者[这篇文章。](https://mp.weixin.qq.com/s/KlcH9B4TiLQjVv77gYxNsQ)

`nodemon`用来监视node.js应用程序中的任何更改并自动重启服务,非常适合用在开发环境中。

#### 配置

在preact项目的package.json的中添加如下script：

```json
"watch": "nodemon --watch src/ -x 'npm run build && yalc push'",
```

添加完成后执行`npm run  watch`。

在demo项目中执行命令：

```bash
yalc add preact
```

然后此时执行`npm i`，然后再启动demo:`npm run dev`

**命令解释：**

 `nodemon --watch src/ `表示监听preact项目里的文件变化，并执行-x 后边定义的script：`npm run build && yalc push`，即先build preact项目，然后yalc再推送build完的项目。

`yalc add preact`表示将preact关联到demo项目。



如果preact项目可以正常运行，那我们的测试项目已经搭建完成了。

测试一下，打开demo项目的浏览器控制台，并在preact项目的src/index.js中加上`console.log ('demo finished!')`，此时浏览器控制台有输出,

OHHHHH~



