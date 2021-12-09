/** @see https://leetcode-cn.com/problems/0H97ZC/ */
var relativeSortArray = function (arr1, arr2) {
	const map = {}
	const a1 = []
	const a2 = []

	arr2.forEach((item, index) => {
		map[item] = index - arr2.length
	})

	const getValue = num => {
		if (map[num] < 0) return map[num]
		return num
	}

	const quick = (arr, low, high) => {
		let i = low
		let j = high
		let x = arr[low]

		if (i > j) return

		while (i < j) {
			while (i < j && getValue(arr[j]) >= getValue(x)) j--
			while (i < j && getValue(arr[i]) <= getValue(x)) i++

			if (i < j) {
				const temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}
		arr[low] = arr[i]
		arr[i] = x

		quick(arr, low, i - 1)
		quick(arr, i + 1, high)
	}

	quick(arr1, 0, arr1.length - 1)

	arr1.forEach(item => {
		if (getValue(item) < 0) a1.push(item)
		else a2.push(item)
	})

	a1.push(...a2)
	return a1
}

console.log(relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]))

var minSteps = function (n) {
	let count = 0
	for (let index = 2; index <= n; index++) {
		let ans = 0
		while (index % n === 0) {
			ans += index
			n /= index
		}
		count += ans
	}

	return count
}

/** @see https://leetcode-cn.com/problems/w3tCBm/ */
var countBits = function (n) {
	const arr = Array(n + 1).fill(0)

	let high = 0
	for (let index = 1; index <= n; index++) {
		if ((index & (index - 1)) === 0) {
			high = index
		}
		arr[index] = arr[index - high] + 1
	}
	return arr

	const bits = new Array(n + 1).fill(0)
	let highBit = 0
	for (let i = 1; i <= n; i++) {
		if ((i & (i - 1)) == 0) {
			highBit = i
		}
		bits[i] = bits[i - highBit] + 1
	}
	return bits
}

console.log(countBits(5))
