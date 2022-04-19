function A() {}
function B() {}
// 原型继承
B.prototype = new A()
// 构造函数继承
function B() {
	A.call(this)
}
// 组合继承
function B() {
	A.call(this)
}
B.prototype = new A()
// 原型式继承
function myCreate(fn) {
	function foo() {}
	foo.prototype = fn
	return new foo()
}
B.prototype = myCreate(A)
B.constructor = B
// 寄生
function doSomething(fn) {
	function foo() {}
	foo.prototype = fn
	foo.prototype.aaa = {}
	return new foo()
}
B.prototype = doSomething(A)
B.constructor = B
// 寄生组合
function B() {
	A.call(this)
}
function doSomething(fn) {
	function foo() {}
	foo.prototype = fn
	foo.prototype.aaa = {}
	return new foo()
}
B.prototype = doSomething(A)
B.constructor = B
// instanceof
function myInstanceOf(A, B) {
	let prototype = B.prototype
	let proto = A.__proto__
	while (true) {
		if (!proto) return false
		if (prototype === proto) return true
		else proto = proto.__proto__
	}
}
// new
function myNew(fn, args) {
	let obj = {}
	obj.__proto__ = fn.prototype
	let res = fn.apply(obj, args)
	if (res instanceof Object) return res
	return obj
}
// typeof

// 扁平化
function float(arr) {
	if (!Array.isArray(arr)) return [arr]
	let res = []
	for (const c of arr) {
		res.push(...float(c))
	}
	return res
}
// 深拷贝
const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error]
function DeepCopy(obj, map = new WeakMap()) {
	if (map.has(obj)) return obj
	if (obj === null || typeof obj !== 'object') return obj
	if (reference.includes(obj?.constructor)) return new obj.constructor(obj)
	if (Array.isArray(obj)) {
		let copy = []
		map.set(obj, copy)
		for (const item of obj) {
			copy.push(DeepCopy(item, map))
		}
		return copy
	}
	let copy = {}
	map.set(obj, copy)
	Reflect.ownKeys(obj).forEach(key => {
		copy[key] = DeepCopy(obj[key], map)
	})
	return copy
}
// let objjj = { a: 1, b: new Error('123'), [Symbol('')]: 2 }
// objjj['c'] = objjj
// console.log(DeepCopy(objjj))
// 防抖
const debounce = (fn, interval = 200, immediate) => {
	let timer = null
	function func(...args) {
		clearTimeout(timer)
		let cxt = this
		if (immediate) {
			let called = timer
			timer = setTimeout(() => {
				timer = null
			}, interval)
			called && fn.apply(cxt, args)
		} else {
			timer = setTimeout(() => {
				fn.apply(cxt, args)
			}, interval)
		}
	}
	return func
}
// 节流
const throttle = (fn, interval = 200) => {
	let timer = null
	function func(...args) {
		let cxt = this
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(cxt, args)
				timer = null
			}, interval)
		}
	}

	return func
}
// curry
function curry(fn) {
	function func(...args) {
		if (args.length === fn.length) return fn(...args)
		else return (...arg) => func(...args, ...arg)
	}
	return func
}
// call
Function.prototype.call2 = function (ctx, ...args) {
	ctx = ctx || window
	ctx.__fn__ = this
	let res = ctx.__fn__(...args)
	delete ctx.__fn__
	return res
}
// bind
Function.prototype.bind2 = function (ctx, ...args) {
	let that = this
	function func(...args2) {
		ctx = ctx || window
		ctx.__fn__ = that
		let res = ctx.__fn__(...args, ...args2)
		delete ctx.__fn__
		return res
	}
	return func
}

function AAAA() {}

try {
} catch (error) {
	console.log(1)
}
