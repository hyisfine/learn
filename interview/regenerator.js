const regenerator = fn => {
	const context = {
		next: 0,
		sent: null,
		done: false
	}

	return {
		next(param) {
			context.sent = param
			let value = fn(context)
			return {
				done: context.done,
				value
			}
		}
	}
}

const fn = context => {
	switch (context.next) {
		case 1:

		default:
			break
	}
}

function promise1() {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(1)
			resolve(1)
		}, 1000)
	})
}
function promise2() {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(1)
			resolve(1)
		}, 1000)
	})
}
function promise3() {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(1)
			resolve(1)
		}, 1000)
	})
}
function promise4() {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(1)
			resolve(1)
		}, 1000)
	})
}

function* add() {
	return (yield promise1()) + (yield promise2()) + (yield promise3()) + (yield promise4())
}

const co = fn => {
	return new Promise((resolve, reject) => {
		let g = fn()
		const next = param => {
			const {value, done} = g.next(param)
			if (done) resolve(value)
			else Promise.resolve(value).then(res => next(res))
		}

		next()
	})
}

co(add)

// ;[promise1, promise2, promise3, promise4].reduce((p, v) => p.then(v), Promise.resolve())
