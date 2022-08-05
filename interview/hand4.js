function A() {}
function B() {}
B.prototype = new A()
function C() {
	A.call(this)
}
function D() {
	A.call(this)
}
D.prototype = new A()
function createObj(obj) {
	let foo = {}
	Object.setPrototypeOf(foo, obj)
	return foo
}

function E() {
	A.call(this)
}
E.prototype = createObj(A.prototype)

const __myNew = (fn, ...args) => {
	let obj = {}
	Object.setPrototypeOf(obj, fn.prototype)
	const res = fn.apply(obj, args)
	res instanceof Object ? res : obj
}
