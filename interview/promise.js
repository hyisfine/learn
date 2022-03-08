class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(func) {
		this.status = MyPromise.PENDING
		this.result = null
		this.reason = null
		this.fulfilledCallbacks = []
		this.rejectedCallbacks = []

		try {
			func(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	isPending = () => this.status === MyPromise.PENDING
	isFulfilled = () => this.status === MyPromise.FULFILLED
	isRejected = () => this.status === MyPromise.REJECTED

	resolve = result => {
		if (this.isPending()) {
			setTimeout(() => {
				this.status = MyPromise.FULFILLED
				this.result = result
				this.fulfilledCallbacks.forEach(callback => callback && callback(result))
			})
		}
	}

	reject = reason => {
		if (this.isPending()) {
			setTimeout(() => {
				this.status = MyPromise.REJECTED
				this.reason = reason
				this.rejectedCallbacks.forEach(callback => callback && callback(reason))
			})
		}
	}

	then = (onfulfilled, onrejected) => {
		onfulfilled = MyPromise.isFunc(onfulfilled) ? onfulfilled : value => value
		onrejected = MyPromise.isFunc(onrejected)
			? onrejected
			: reason => {
					throw reason
			  }

		const promise = new MyPromise((resolve, reject) => {
			if (this.isPending()) {
				this.fulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onfulfilled(this.result)
							MyPromise.resolvePromiseX(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
				this.rejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onrejected(this.reason)
							MyPromise.resolvePromiseX(promise, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				})
				return
			}
			if (this.isFulfilled()) {
				return setTimeout(() => {
					try {
						let x = onfulfilled(this.result)
						MyPromise.resolvePromiseX(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (this.isRejected()) {
				return setTimeout(() => {
					try {
						let x = onrejected(this.reason)
						MyPromise.resolvePromiseX(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
		})

		return promise
	}

	catch = onrejected => this.then(null, onrejected)

	static isFunc = func => typeof func === 'function'

	static resolvePromiseX = (promise, x, resolve, reject) => {
		if (promise === x) return reject(new TypeError('1234567'))
		if (x === null || (typeof x !== 'object' && typeof x !== 'function')) return resolve(x)
		if (x instanceof MyPromise) {
			if (x.isPending()) return x.then(y => MyPromise.resolvePromiseX(promise, y, resolve, reject), reject)
			if (x.isFulfilled()) return resolve(x.result)
			if (x.isRejected()) return reject(x.reason)
		}
		let then
		try {
			then = x.then
		} catch (error) {
			reject(error)
		}
		if (!MyPromise.isFunc(then)) return resolve(x)
		let called = false
		try {
			then.call(
				x,
				y => {
					if (called) return
					called = true
					MyPromise.resolvePromiseX(promise, y, resolve, reject)
				},
				z => {
					if (called) return
					called = true
					reject(z)
				}
			)
		} catch (error) {
			if (called) return
			called = true
			reject(error)
		}
	}

	static deferred = () => {
		let result = {}
		result.promise = new MyPromise((resolve, reject) => {
			result.resolve = resolve
			result.reject = reject
		})
		return result
	}
}

module.exports = MyPromise

MyPromise.resolve = value => {
	if (value instanceof MyPromise) return value
	if (value instanceof Object && 'then' in value)
		return new MyPromise((resolve, reject) => {
			value.then(resolve, reject)
		})
	return new MyPromise((resolve, reject) => {
		resolve(value)
	})
}

MyPromise.reject = value => {
	return new MyPromise((resolve, reject) => {
		reject(value)
	})
}

MyPromise.all = funcs => {
	return new Promise((resolve, reject) => {
		let result = []
		if (Array.isArray(funcs)) {
			if (!funcs.length) resolve(funcs)
			funcs.forEach(func => {
				MyPromise.resolve(func).then(res => {
					result.push(res)
					result.length === funcs.length && resolve(result)
				}, reject)
			})
		} else reject('args type error')
	})
}
