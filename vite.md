# vite 源码学习笔记
___

### 官网笔记
1. Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类。
2. Vite 将会使用 ```esbuild``` 预构建依赖。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
3. Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。
4. 源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存.
5. 预构建-检测裸模块导入-CommonJS / UMD 转换为 ESM 格式-重写 url
6. 所有框架语法开箱即用，css 类框架需下载各自解析器
7. Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块
8. falsy 值 (虚值) 是在 Boolean 上下文中认定为 false 的值。false 0 '' null undefined NaN

### 源码笔记

### 知识点

1. vite 以 monorepo 方式管理所有项目，所用package.json字段，workspaces

#### 涉及 npm 包

1. source-map-support 
2. inspector 
3. cac
4. dotenv
5. run-p 
6. rimraf
7. run-s
8. rollup
9. api-extractor
10. conventional-changelog
11. tsc 

#### 编译结果 js
1. void 0
2. HTMLLinkElement
3. modulepreload

编译结果：
```javascript
//  entry js
    const l={} // 存放所有引入js

    //  方法 动态引入js，且实现： https://cn.vitejs.dev/guide/features.html#build-optimizations
    //  1.该异步 chunk 会保证只在 CSS 加载完毕后再执行，避免发生 FOUC 。
    //  2.预加载指令生成，自动生成 <link rel="modulepreload"> 指令
    //  3.异步 Chunk 加载优化，异步依赖chunk同时下载


    const a = function (e, t) {
		if (!t) return e();
		if (void 0 === n) {
			const e = document.createElement('link').relList;
			n = e && e.supports && e.supports('modulepreload') ? 'modulepreload' : 'preload';
		}
		return Promise.all(
			t.map((e) => {
				if (e in l) return;
				l[e] = !0;
				const t = e.endsWith('.css'),
					r = t ? '[rel="stylesheet"]' : '';
				if (document.querySelector(`link[href="${e}"]${r}`)) return;
				const a = document.createElement('link');
				return (
					(a.rel = t ? 'stylesheet' : n),
					t || ((a.as = 'script'), (a.crossOrigin = '')),
					(a.href = e),
					document.head.appendChild(a),
					t
						? new Promise((e, t) => {
								a.addEventListener('load', e), a.addEventListener('error', t);
						  })
						: void 0
				);
			}),
		).then(() => e());
	};

a(() => import('./dy.1d0aef29.js'), [
	'/assets/dy.1d0aef29.js',
	'/assets/dy.492d24df.js',
	'/assets/dy.ed2055bd.css',
]),

```