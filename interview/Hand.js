const typeOf = arg => {
	let type = Object.prototype.toString.call(arg).match(/\w+(?=\])/g)[0]
	return type
}
// 原型链继承
function Parent() {}
function Son() {}
Son.prototype = new Parent()
// 构造函数
function Parent() {}
function Son() {
	Parent.call(this)
}
// 组合继承
function Parent() {}
function Son() {
	Parent.call(this)
}
Son.prototype = new Parent()
// 原型式继承
const inherit = obj => {
	function Foo() {}
	Foo.prototype = obj
	return new Foo()
}
// 寄生组合
function Parent() {}
function Son() {
	Parent.call(this)
}
function doSomething(origin) {
	function Foo() {}
	Foo.prototype = origin
	let f = new Foo()
	// do something
	return f
}
Son.prototype = doSomething(Parent)
Son.prototype.constructor = Son
// 去重
// [...new Set(arr)]
// 扁平化
const flat = arr => {
	let res = []
	const dfs = __arr => {
		for (const item of __arr) {
			if (Array.isArray(item)) dfs(item)
			else res.push(item)
		}
	}
	dfs(arr)
	return res
}
//  深拷贝
const deepCopy = (obj, map = new Map()) => {
	if (map.get(obj)) return obj
	if (!(obj instanceof Object) && !Array.isArray(obj)) return obj
	let copy = Array.isArray(obj) ? [] : {}
	map.set(copy, true)
	Reflect.ownKeys(obj).forEach(key => (copy[key] = deepCopy(obj[key])))
	return copy
}
// 事件订阅
class MyEvents {
	constructor() {
		this.events = {}
	}
	on(name, handler) {
		if (this.events[name]) this.events[name].push(handler)
		else this.events[name] = [handler]
	}
	off(name, handler) {
		if (!this.events[name]) return
		let index = this.events[name].findIndex(__handler => __handler === handler)
		if (~index) return
		this.events.splice(index, 1)
	}
	emit(name, ...args) {
		if (this.events[name]) return
		this.events[name].forEach(handler => handler(...args))
	}
}
// 图片懒加载
// let imgList = Array.from(document.query SelectorAll('img'))
// const lazyLoad = () => {
// 	let deleteIndexArr = []
// 	if (!imgList.length) return
// 	imgList.forEach((img, index) => {
// 		let rect = img.getBoundingClientRect()
// 		if (rect.top < window.innerHeight) {
// 			img.src = img.dataset.src
// 			deleteIndexArr.push(index)
// 		}
// 	})
// 	imgList = imgList.filter((img, index) => !deleteIndexArr.includes(index))
// }

// 防抖
const debounce = (fn, interval, immediate) => {
	let timer
	const func = (...arg) => {
		clearTimeout(timer)
		if (immediate) {
			!timer && fn(...arg)
			timer = setTimeout(() => {
				timer = null
			}, interval)
		} else {
			timer = setTimeout(() => {
				timer = null
				fn(...arg)
			}, interval)
		}

		timer = setTimeout(() => {
			fn()
			timer = null
		}, 200)
	}
	func.cancel = () => {
		clearTimeout(timer)
		timer = null
	}

	return func
}
// 节流

const throttle = (fn, interval) => {
	let timer
	let previous

	let func = (...args) => {
		if (timer) return
		timer = setTimeout(() => {
			timer = null
			fn(...args)
			previous = Date.now()
		}, interval)
	}

	func.cancel = () => {
		clearTimeout(timer)
		timer = null
	}

	return func
}
// 柯里化
const curry = fn => {
	let func = (...args) => {
		if (args.length === fn.length) return fn(...args)
		return (...args1) => func(...args, ...args1)
	}
	return func
}
// // xhr
// let xhr = new XMLHttpRequest()
// xhr.open('GET', '', false)
// xhr.onreadystatechange = response => {
// 	if (xhr.readyState === 4 && xhr.status === 200) {
// 	}
// }
// xhr.send()
// reduce
Array.prototype.reduce2 = function (callback, initialValue) {
	if (!this) throw new TypeError('this is null or not defined')
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
	let len = this.length
	let obj = Object(this)
	let index = 0
	let prev
	if (arguments.length > 1) prev = initialValue
	else {
		while (!(index in obj) && index < len) index++
		if (index > len) throw new TypeError('12345rt')
		prev = obj[index++]
	}
	while (index < len) {
		if (index in obj) prev = callback(prev, obj[index], index, this)
		index++
	}
	return prev
}
// call
Function.prototype.call2 = function (self, ...args) {
	if (self === null || self === undefined) self = globalThis
	else if (typeof self !== 'object' && typeof self !== 'function') self = Object(self)
	let key = Math.random().toString(36).slice(2, 8)
	self[key] = this
	let res = self[key](...args)
	delete self[key]
	return res
}
// bind
Function.prototype.bind2 = function (context, ...args) {
	let self = this
	function Foo() {}
	Foo.prototype = this.prototype
	let bindFunc = function (...args2) {
		self.call(this instanceof Foo ? this : context, ...args, ...args2)
	}
	bindFunc.prototype = new Foo()
	return bindFunc
}
// new
const myNew = (constructor, ...args) => {
	function Temp() {}
	Temp.prototype = constructor.prototype
	let obj = new Temp()
	let res = constructor.call(obj, ...args)
	return res instanceof Object ? res : obj
}
// instanceof
const instanceOf = (left, right) => {
	let proto = Object.getPrototypeOf(left)
	let prototype = right.prototype
	while (proto) {
		if (proto === prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
	return false
}
// Object.create
const create = proto => {
	function Temp() {}
	Temp.prototype = proto
	let obj = new Temp()
	if (proto === null) obj.__proto__ = null
	return obj
}
// assign
const assign = (target, ...sources) => {
	if (target === null || target === undefined) throw Error('12345r')
	target = Object(target)
	sources.forEach(source => {
		if (source === null || source === undefined) return
		Reflect.ownKeys(source).forEach(key => (target[key] = source[key]))
	})
	return target
}
let obj = {
	[Symbol.iterator]() {
		let count = 0
		return {
			next() {
				count++
				console.log(1)
				return {done: count === 4, value: count}
			}
		}
	}
}

let a = [...obj]
document.createElement('link').href
