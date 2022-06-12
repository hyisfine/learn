// 寄生组合继承
function A() {}
function myCreate(proto) {
	function foo() {}
	foo.prototype = proto
	let obj = new foo()
	return obj
}
function B() {
	A.call(this)
}
B.prototype = myCreate(A.prototype)
B.prototype.constructor = B
// 防抖
const debounce = (fn, interval, immediate) => {
	let timer = null
	return args => {
		clearTimeout(timer)
		if (immediate) {
			!timer && fn(args)
			timer = setTimeout(() => {
				timer = null
			}, interval)
		} else {
			timer = setTimeout(() => {
				fn(args)
			}, interval)
		}
	}
}
// 节流
const throttle = (fn, interval) => {
	let timer = null
	return args => {
		if (timer) return
		timer = setTimeout(() => {
			fn(args)
			timer = null
		}, interval)
	}
}

const compose = (...fns) => {
	let arg = [undefined]
	for (const fn of fns) {
		arg = fn(...arg)
	}
	return arg
}
const fn = () => {}
compose(fn, fn, fn)

const forMap = callback => {
	if (this == null) {
		throw new TypeError('this is null or not defined')
	}
	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function')
	}
	let obj = Object(this)
	let len = obj.length
	let i = 0
	while (i < len) {
		if (obj.hasOwnProperty(i)) {
			callback(obj[i], i)
		}
	}
}

const reduce = function (callback, initialValue) {
	let cur = initialValue
	let obj = Object(this)
	let len = obj.length
	let i = 0
	if (arguments.length === 1) {
		while (i < len) {
			if (Object.hasOwn(obj, i)) {
				cur = obj[i]
				i++
				break
			}
			i++
		}
		if (i === len) {
			throw '1234567'
		}
	}
	while (i < len) {
		if (Object.hasOwn(obj, i)) {
			cur = callback(cur, obj[i], i, this)
			i++
			break
		}
		i++
	}
	return cur
}

function bind(ctx, ...args1) {
	function BindProto() {}
	let that = this
	function BindFunc(...args2) {
		return that.call(this instanceof BindProto ? this : ctx, ...args1, ...args2)
	}
	BindFunc.prototype = Object.create(BindProto.prototype)
	BindFunc.prototype.constructor = BindFunc
	return BindFunc
}
const newNew = fn => {
	const obj = {}
	Object.setPrototypeOf(obj, fn.prototype)
	let res = fn.call(obj)
	return res instanceof Object ? res : obj
}
const myInstanceofff = (child, parent) => {
	let prototype = parent.prototype
	let proto = Object.getPrototypeOf(child)
	while (true) {
		if (!proto) return false
		if (proto === prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
}

let constructor = [Date, RegExp, Error, Set, Map]
const deepCopy = (obj, map = new WeakMap()) => {
	if (map.has(obj)) return map.get(obj)
	if (typeof obj === 'function') return eval(obj.toString())
	if (obj === null || typeof obj !== 'object') return obj
	if (constructor.includes(obj.constructor)) return obj.constructor(obj)
	let copy
	if (Array.isArray(obj)) {
		copy = []
		map.set(obj, copy)

		for (let i = 0; i < obj.length; i++) {
			copy[i] = deepCopy(obj[i], map)
		}
	} else {
		copy = {}
		map.set(obj, copy)

		Reflect.ownKeys(obj).forEach(key => {
			copy[key] = deepCopy(obj[key], map)
		})
	}
	return copy
}

const removeRepeat = arr => {
	let res = []
	arr.forEach(item => {
		if (
			!res.some(_item => {
				return Object.is(_item, item)
			})
		) {
			res.push(item)
		}
	})
	return res
}
console.log(removeRepeat([NaN, NaN, 0, +0, +0, -0, -0]))

Array.prototype.reduce = function (callback, initial) {
	if (typeof callback !== 'function') throw TypeError('2345')

	let obj = Object(this)
	let len = this.length
	let _initial
	let k = 0
	if (arguments.length > 1) {
		_initial = initial
	} else {
		while (k < len && !Object.hasOwn(obj, k)) {
			k++
		}
		if (k >= len) throw TypeError('2345')
		_initial = obj[k++]
	}
	while (k < len) {
		if (Object.hasOwn(obj, k)) {
			_initial = callback(_initial, obj[k], k, this)
		}
		k++
	}
	return _initial
}
