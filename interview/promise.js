const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isPENDING = promise => promise.status === PENDING
const isFULFILLED = promise => promise.status === FULFILLED
const isREJECTED = promise => promise.status === REJECTED

const isFunc = fn => typeof fn === 'function'
const isObject = obj => obj !== null && typeof obj === 'object'

const asyncFunc = fn => {
	setTimeout(fn)
}

const resolvePromiseX = (resolve, reject, promise, x) => {
	if (promise === x) throw TypeError('1234rt')
	if (x === null || (typeof x !== 'object' && typeof x !== 'function')) return resolve(x)
	if (x instanceof MyPromise) {
		if (isPENDING(x)) x.then(y => resolvePromiseX(resolve, reject, promise, y), reject)
		else if (isFULFILLED(x)) resolve(x.result)
		else if (isREJECTED(x)) reject(x.reason)
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
				resolvePromiseX(resolve, reject, promise, y)
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
	constructor(fn) {
		this.status = PENDING
		this.result = null
		this.reason = null
		this.fulfilledCallback = []
		this.rejectedCallback = []

		try {
			fn(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	resolve = result => {
		if (isPENDING(this)) {
			asyncFunc(() => {
				this.status = FULFILLED
				this.result = result
				this.fulfilledCallback.forEach(callback => callback())
			})
		}
	}

	reject = reason => {
		if (isPENDING(this)) {
			asyncFunc(() => {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCallback.forEach(callback => callback())
			})
		}
	}

	then = (onfulfilled, onrejected) => {
		onfulfilled = isFunc(onfulfilled) ? onfulfilled : result => result
		onrejected = isFunc(onrejected)
			? onrejected
			: reason => {
					throw reason
			  }

		const promise = new MyPromise((resolve, reject) => {
			if (isPENDING(this)) {
				this.fulfilledCallback.push(() => {
					asyncFunc(() => {
						try {
							const x = onfulfilled(this.result)
							resolvePromiseX(resolve, reject, promise, x)
						} catch (error) {
							reject(error)
						}
					})
				})
				this.rejectedCallback.push(() => {
					asyncFunc(() => {
						try {
							const x = onrejected(this.reason)
							resolvePromiseX(resolve, reject, promise, x)
						} catch (error) {
							reject(error)
						}
					})
				})
			}
			if (isFULFILLED(this)) {
				asyncFunc(() => {
					try {
						const x = onfulfilled(this.result)
						resolvePromiseX(resolve, reject, promise, x)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (isREJECTED(this)) {
				asyncFunc(() => {
					try {
						const x = onrejected(this.reason)
						resolvePromiseX(resolve, reject, promise, x)
					} catch (error) {
						reject(error)
					}
				})
			}
		})

		return promise
	}
	catch = callback => this.then(null, callback)
	finally = callback => this.then(callback, callback)
	static deferred = () => {
		let result = {}
		result.promise = new MyPromise((resolve, reject) => {
			result.resolve = resolve
			result.reject = reject
		})
		return result
	}

	static resolve = val => {
		if (val instanceof MyPromise) return val
		if (typeof val === 'object' && val !== null && Object.hasOwn(val, 'then'))
			return new MyPromise((resolve, reject) => {
				val.then(resolve, reject)
			})
		return new MyPromise((resolve, reject) => {
			resolve(val)
		})
	}

	static all = arr => {
		return new Promise((resolve, reject) => {
			if (!Array.isArray(arr)) reject('234t')
			else {
				let len = arr.length
				let count = 0
				let res = []
				if (!len) resolve([])
				else {
					arr.forEach((promise, index) => {
						MyPromise.resolve(promise).then(val => {
							res[index] = val
							count++
							if (count === len) resolve(res)
						}, reject)
					})
				}
			}
		})
	}
}

module.exports = MyPromise
