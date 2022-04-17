function* AA() {
	console.log('start')
	console.log(1)
	console.log(yield '11')
	console.log(2)
	console.log(yield '22')
	console.log('end')
}

const gAA = () => {
	let flag = 0
	let value = undefined
	let done = false
	let prev = undefined
	const fn = () => {
		switch (flag) {
			case 0:
				value = '11'
				console.log('start')
				console.log(1)
				return (flag = 1)
			case 1:
				value = '22'
				console.log(prev)
				console.log(2)
				return (flag = 2)
			case 2:
				console.log(prev)
				console.log('end')
				done = true
				flag = 3
				value = undefined
			case 3:
		}
	}
	return {
		next(p) {
			prev = p
			fn()
			return {
				value,
				done,
			}
		},
	}
}

// let ga = gAA()
// console.log(ga.next(1))
// console.log(ga.next(2))
// console.log(ga.next(3))
// console.log(ga.next(4))
// console.log('======')
// let aa = AA()
// console.log(aa.next(1))
// console.log(aa.next(2))
// console.log(aa.next(3))
// console.log(aa.next(4))

let p1 = new Promise(a => {
	console.log('p1')
	a('1')
})
let p2 = new Promise(a => {
	console.log('p2')
	setTimeout(() => {
		a('2')
	}, 2000)
})
let p3 = new Promise(a => {
	console.log('p3')
	a('3')
})

const co = fn => {
	return new Promise(resolve => {
		let g = fn()
		const next = val => {
			const { value, done } = g.next(val)
			if (done) resolve(value)
			else Promise.resolve(value).then(next)
		}
		next()
	})
}

function* aaa() {
	console.log('====', yield p1)
	console.log('====', yield p2)
	console.log('====', yield p3)
}

co(aaa)
