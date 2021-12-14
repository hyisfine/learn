const change = (arr, i, j) => {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

const mao = arr => {
	console.time('mao')
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1 - i; j++) if (arr[j] > arr[j + 1]) change(arr, j, j + 1)
	}
	console.timeEnd('mao')
	return arr
}

const xuan = arr => {
	console.time('xuan')
	for (let i = 0; i < arr.length - 1; i++) {
		let min = i
		for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[min]) min = j
		change(arr, i, min)
	}
	console.timeEnd('xuan')
	return arr
}

const cha = arr => {
	console.time('cha')
	for (let i = 1; i < arr.length; i++) {
		for (let j = i; j >= 1; j--) {
			if (arr[j] < arr[j - 1]) change(arr, j, j - 1)
			else break
		}
	}
	console.timeEnd('cha')
	return arr
}

const count = arr => {
	console.time('count')
	let numbersObj = {}

	for (let i = 0; i < arr.length; i++) {
		const key = arr[i]
		if (key in numbersObj) numbersObj[key]++
		else numbersObj[key] = 1
	}

	const result = []

	for (const key in numbersObj) {
		const count = numbersObj[key]
		if (~~key > 0) result.push(...Array(count).fill(~~key))
		else result.unshift(...Array(count).fill(~~key))
	}

	console.timeEnd('count')
	return result
}

const kuai = arr => {
	console.time('kuai')
	const fn = (arr, low, high) => {
		let i = low
		let j = high
		let x = arr[low]

		if (i > j) return

		while (i < j) {
			while (i < j && arr[j] > x) j--
			while (i < j && arr[i] <= x) i++

			if (i < j) change(arr, i, j)
		}

		arr[low] = arr[i]
		arr[i] = x

		fn(arr, low, i - 1)
		fn(arr, i + 1, high)
	}
	fn(arr, 0, arr.length - 1)
	console.timeEnd('kuai')
	return arr
}

const binary = arr => {
	const len = arr.length
	if (len <= 1) return arr

	const m = arr[0]
	const l = []
	const r = []

	for (let i = 1; i < len; i++) {
		if (arr[i] <= m) l.push(arr[i])
		else r.push(arr[i])
	}
	return [...binary(l), m, ...binary(r)]
}

const heap = arr => {
	console.time('heap')
	class Heap {
		constructor(arr) {
			this.arr = arr
			this.buildHeap()
		}

		buildHeap() {
			const len = this.arr.length - 1
			const lastP = len % 2 === 0 ? (len - 2) / 2 : (len - 1) / 2
			for (let j = lastP; j >= 0; j--) {
				let i = j
				while (i <= len) {
					const p = this.arr[i]
					const l = this.arr[i * 2 + 1]
					const r = this.arr[i * 2 + 2]

					if ((r === undefined || l <= r) && l < p) {
						change(this.arr, i, i * 2 + 1)
						i = i * 2 + 1
						continue
					}
					if (r < l && r < p) {
						change(this.arr, i, i * 2 + 2)
						i = i * 2 + 2
						continue
					}

					break
				}
			}
		}

		delete() {
			if (!this.arr.length) return null
			const bottom = this.arr.pop()
			const len = this.arr.length
			if (!len) return bottom
			const temp = this.arr[0]
			this.arr[0] = bottom

			let i = 0
			while (i < len) {
				const p = this.arr[i]
				const l = this.arr[i * 2 + 1]
				const r = this.arr[i * 2 + 2]

				if ((r === undefined || l <= r) && l < p) {
					change(this.arr, i, i * 2 + 1)
					i = i * 2 + 1
					continue
				}
				if (r < l && r < p) {
					change(this.arr, i, i * 2 + 2)
					i = i * 2 + 2
					continue
				}

				break
			}

			return temp
		}
	}

	const h = new Heap(arr)
	const result = []

	for (let i = 0; i < arr.length; i++) {
		result.push(h.delete())
	}
	console.timeEnd('heap')
	return result
}

let arr = Array(10000000)
	.fill(0)
	.map(() => Math.floor(Math.random() * 10000))
count(arr)
arr = Array(10000000)
	.fill(0)
	.map(() => Math.floor(Math.random() * 10000))
heap(arr)
arr = Array(10000000)
	.fill(0)
	.map(() => Math.floor(Math.random() * 10000))
kuai(arr)
arr = Array(10000000)
	.fill(0)
	.map(() => Math.floor(Math.random() * 10000))
console.time('binary')
binary(arr)
console.timeEnd('binary')
// arr = Array(100000)
// 	.fill(0)
// 	.map(() => Math.floor(Math.random() * 10000))
// cha(arr)
// arr = Array(100000)
// 	.fill(0)
// 	.map(() => Math.floor(Math.random() * 10000))
// mao(arr)
// arr = Array(100000)
// 	.fill(0)
// 	.map(() => Math.floor(Math.random() * 10000))
// xuan(arr)
