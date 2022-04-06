const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isPending = status => status === PENDING
const isFulfilled = status => status === FULFILLED
const isRejected = status => status === REJECTED

const isFunc = func => typeof func === 'function'

const resolvePromiseX = (promise, x, resolve, reject) => {
	if (promise === x) throw TypeError('1234567')
	if (x === null || (typeof x !== 'object' && typeof x !== 'function')) return resolve(x)
	if (x instanceof MyPromise) {
		if (isPending(x.status)) return x.then(y => resolvePromiseX(promise, y, resolve, reject), reject)
		if (isFulfilled(x.status)) return resolve(x.result)
		return reject(x.reason)
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
		this.result = null
		this.reason = null
		this.fulfilledCallback = []
		this.rejectedCallback = []

		try {
			func(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	resolve = result => {
		if (isPending(this.status)) {
			setTimeout(() => {
				this.status = FULFILLED
				this.result = result
				this.fulfilledCallback.forEach(callback => callback())
			})
		}
	}

	reject = reason => {
		if (isPending(this.status)) {
			setTimeout(() => {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCallback.forEach(callback => callback())
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
			if (isPending(this.status)) {
				this.fulfilledCallback.push(() => {
					setTimeout(() => {
						try {
							const x = onfulfilled(this.result)
							resolvePromiseX(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
				this.rejectedCallback.push(() => {
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

			if (isFulfilled(this.status)) {
				setTimeout(() => {
					try {
						const x = onfulfilled(this.result)
						resolvePromiseX(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (isRejected(this.status)) {
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
		if (typeof val === 'object' && 'then' in val)
			return new MyPromise((resolve, reject) => {
				val.then(resolve, reject)
			})
		return new MyPromise((resolve, reject) => {
			resolve(val)
		})
	}

	static all = arr => {
		return new MyPromise((resolve, reject) => {
			let result = []
			let count = 0
			if (Array.isArray(arr)) {
				if (!arr.length) resolve(arr)
				arr.forEach(func => {
					MyPromise.resolve(func).then((res, index) => {
						result[index] = res
						count++
						if (count === arr.length) resolve(result)
					}, reject)
				})
			} else reject('234')
		})
	}
}

module.exports = MyPromise
