const change = (arr, i, j) => {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

const bubbling = arr => {
	let len = arr.length
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i; j++) {
			if (arr[j] > arr[j + 1]) change(arr, j, j + 1)
		}
	}
}

const select = arr => {
	let len = arr.length
	for (let i = 0; i < len; i++) {
		let min = i
		for (let j = i + 1; j < len; j++) {
			if (arr[min] > arr[j]) min = j
		}
		change(arr, min, i)
	}
}

const insertion = arr => {
	let len = arr.length
	for (let i = 0; i < arr.length; i++) {
		for (let j = i; j >= 0; j--) {
			if (arr[j] >= arr[j - 1]) break
			change(arr, i, j)
		}
	}
}

const quick = arr => {
	const fn = (low, high) => {
		if (high < low) return

		let i = low
		let j = high
		let x = arr[low]

		while (i < j) {
			while (i < j && arr[j] > x) j--
			while (i < j && arr[i] <= x) i++
			if (i < j) change(arr, i, j)
		}
		change(arr, low, i)

		fn(low, i - 1)
		fn(i + 1, high)
	}

	fn(0, arr.length - 1)
}

const binary = arr => {
	const len = arr.length
	if (len <= 1) return arr

	let middle = [arr[0]]
	let left = []
	let right = []
	for (let i = 1; i < len; i++) {
		if (arr[i] < arr[0]) left.push(arr[i])
		if (arr[i] === arr[0]) middle.push(arr[i])
		if (arr[i] > arr[0]) right.push(arr[i])
	}
	return [...binary(left), ...middle, ...binary(right)]
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
