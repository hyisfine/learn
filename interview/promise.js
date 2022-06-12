const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isPENDING = promise => promise.status === PENDING
const isFULFILLED = promise => promise.status === FULFILLED
const isREJECTED = promise => promise.status === REJECTED

const isFunc = fn => typeof fn === 'function'

const resolvePromiseX = (promise, x, resolve, reject) => {
	if (promise === x) throw TypeError('12345678')
	if (x === null || (typeof x !== 'object' && typeof x !== 'function')) return resolve(x)
	if (x instanceof MyPromise) {
		if (isPENDING(x)) x.then(y => resolvePromiseX(promise, y, resolve, reject), reject)
		else if (isFULFILLED(x)) resolve(x.result)
		else reject(x.reason)
		return
	}

	let then
	try {
		then = x.then
	} catch (error) {
		reject(error)
	}

	if (!isFunc(then)) return resolve(x)

	let called = false
	try {
		then.call(
			x,
			y => {
				if (called) return
				called = true
				resolvePromiseX(promise, y, resolve, reject)
			},
			z => {
				if (called) return
				called = true
				reject(z)
			},
		)
	} catch (error) {
		if (called) return
		called = true
		reject(error)
	}
}

class MyPromise {
	constructor(func) {
		this.status = PENDING
		this.reason = null
		this.result = null
		this.fulfilledCallbacks = []
		this.rejectedCallbacks = []

		try {
			func(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	resolve = result => {
		if (isPENDING(this)) {
			setTimeout(() => {
				this.status = FULFILLED
				this.result = result
				this.fulfilledCallbacks.forEach(callback => callback?.(result))
			})
		}
	}

	reject = reason => {
		if (isPENDING(this)) {
			setTimeout(() => {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCallbacks.forEach(callback => callback?.(reason))
			})
		}
	}

	then = (onfulfilled, onrejected) => {
		onfulfilled = isFunc(onfulfilled) ? onfulfilled : val => val
		onrejected = isFunc(onrejected)
			? onrejected
			: val => {
					throw val
			  }

		const promise = new MyPromise((resolve, reject) => {
			if (isPENDING(this)) {
				this.fulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onfulfilled(this.result)
							resolvePromiseX(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
				this.rejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onrejected(this.reason)
							resolvePromiseX(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
			}
			if (isFULFILLED(this)) {
				setTimeout(() => {
					try {
						const x = onfulfilled(this.result)
						resolvePromiseX(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (isREJECTED(this)) {
				setTimeout(() => {
					try {
						const x = onrejected(this.reason)
						resolvePromiseX(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
		})

		return promise
	}

	catch = onrejected => this.then(null, onrejected)

	finally = callback => this.then(callback, callback)
}

MyPromise.resolve = val => {
	if (val instanceof MyPromise) return val
	if (Object.hasOwn(val, 'then')) {
		return new MyPromise((resolve, reject) => {
			val.then(resolve, reject)
		})
	} else return new MyPromise(resolve => resolve(val))
}

MyPromise.all = arr => {
	return new MyPromise((resolve, reject) => {
		if (!Array.isArray(arr)) throw TypeError('12345')
		let len = arr.length
		if (!len) resolve([])
		else {
			let count = 0
			let res = []
			arr.forEach((item, index) => {
				MyPromise.resolve(item).then(result => {
					count++
					res[index] = result
					if (count === len) resolve(res)
				}, reject)
			})
		}
	})
}

MyPromise.allSettled = arr => {
	return new MyPromise(resolve => {
		if (!Array.isArray(arr)) throw TypeError('12345')
		let len = arr.length
		if (!len) resolve([])
		else {
			let count = 0
			let res = []
			arr.forEach((item, index) => {
				MyPromise.resolve(item).then(
					result => {
						count++
						res[index] = { value: result, status: 'fulfilled' }
						if (count === len) resolve(res)
					},
					reason => {
						count++
						res[index] = { value: reason, status: 'rejected' }
						if (count === len) resolve(res)
					},
				)
			})
		}
	})
}

MyPromise.deferred = () => {
	let result = {}
	result.promise = new MyPromise((resolve, reject) => {
		result.resolve = resolve
		result.reject = reject
	})
	return result
}
module.exports = MyPromise

let name = 'x'
const people = {
	name: 'y',
	setName(name) {
		this.name = name
		return () => {
			return this.name
		}
	},
}

let setName = people.setName
let getName = setName(name)

console.log(people.name)
console.log(getName())

let o0 = new Promise((a, b) => {
	a()
})
	.then(() => {
		console.log(1)
	})
	.then(() => {
		console.log(2)
	})
let o1 = new Promise((a, b) => {
	a()
}).then(() => {
	console.log(3)
})

o0.then(() => {
	console.log(4)
})
