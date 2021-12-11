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

// console.log(relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]))

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

/** @see https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/ */
var getLeastNumbers = function (arr, k) {
	let min = arr[0]
	let max = arr[0]
	const _arr = Array(arr.length).fill()
	const _arr2 = []

	arr.forEach(item => {
		if (item < min) min = item
		if (item > max) max = item
	})

	arr.forEach(item => (_arr[item] ? _arr[item].push(item) : (_arr[item] = [item])))

	_arr.forEach(item => {
		item && _arr2.push(...item)
	})

	return _arr2.length > k ? _arr2.slice(0, k) : _arr2
}

// const a = [0, 0, 1, 2, 4, 2, 2, 3, 1, 4]
// console.log(getLeastNumbers(a, 8))

/** @see https://leetcode-cn.com/problems/gaM7Ch/ */
var coinChange = function (coins, amount) {
	let dp = new Array(amount + 1).fill(Infinity)
	dp[0] = 0

	for (let i = 1; i <= amount; i++) {
		for (let j = 0; j < coins.length; j++) {
			const e = coins[j]
			if (e <= i) dp[i] = Math.min(dp[i], dp[i - e] + 1)
		}
	}

	console.log(dp)
	return dp[amount] == Infinity ? -1 : dp[amount]
}

// console.log(coinChange([186, 419, 83, 408], 6249))

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

/** @see https://leetcode-cn.com/problems/lMSNwu/ */
// var addTwoNumbers = function (l1, l2) {
// 	let arr1 = []
// 	let arr2 = []
// 	const arr3 = []

// 	while (l1) {
// 		arr1.unshift(l1.val)
// 		l1 = l1.next
// 	}

// 	while (l2) {
// 		arr2.unshift(l2.val)
// 		l2 = l2.next
// 	}

// 	;[arr1, arr2] = arr1.length > arr2.length ? [arr1, arr2] : [arr2, arr1]

// 	while (arr2.length) {
// 		const a1 = arr1.shift()
// 		const a2 = arr2.shift()
// 		const a2
// 		arr3.unshift(a1 + a2)
// 	}

// 	arr3.unshift(...arr1)

// 	let l = new ListNode()
// 	let next = l
// 	while (arr3.length) {
// 		const a = arr3.shift()
// 		next.val = a
// 		next.next = new ListNode()
// 		next = l.next
// 	}

// 	return l

// 	// const doo = (l, arr) => l.next =
// }

/** @see https://leetcode-cn.com/problems/kLl5u1/ */
var twoSum = function (numbers, target) {
	let i = 0
	let j = numbers.length - 1
	while (i < j) {
		const _target = numbers[i] + numbers[j]
		if (_target === target) return [i, j]
		if (_target > target) j--
		else i++
	}
}

/**
 * @param {number[]} cost
 * @return {number}
 * @see https://leetcode-cn.com/problems/GzCJIP/
 */
var minCostClimbingStairs = function (cost) {
	const dp = Array(cost.length + 1).fill(0)
	dp[0] = dp[1]
	for (let i = 2; i < dp.length; i++) {
		dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
	}
	return dp.pop()
}

// console.log(minCostClimbingStairs([10, 15]))

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/QTMn0o/
 */
var subarraySum = function (nums, k) {
	const map = new Map()
	map.set(0, 1)
	let count = 0

	for (let i = 0; i < nums.length; i++) {
		nums[i] = (nums[i - 1] === undefined ? 0 : nums[i - 1]) + nums[i]
		const v2 = map.get(nums[i] - k)
		if (v2 !== undefined) count += v2

		const v1 = map.get(nums[i])
		if (v1 !== undefined) map.set(nums[i], v1 + 1)
		else map.set(nums[i], 1)
	}
	return count
}

// console.log(subarraySum([1, 1, 1], 2))

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/3u1WK4/submissions/
 */
var getIntersectionNode = function (headA, headB) {
	let len1 = 0
	let len2 = 0

	let l1 = headA
	let l2 = headB
	while (l1 || l2) {
		if (l1) {
			len1++
			l1 = l1.next
		}
		if (l2) {
			len2++
			l2 = l2.next
		}
	}

	;[l1, l2] = len1 >= len2 ? [headA, headB] : [headB, headA]
	;[len1, len2] = len1 >= len2 ? [len1, len2] : [len2, len1]

	while (len1 - len2) {
		l1 = l1.next
		len1--
	}

	while (l1) {
		if (l1 === l2) return l1
		l1 = l1.next
		l2 = l2.next
	}
	return null
}
