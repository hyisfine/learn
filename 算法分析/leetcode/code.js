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
/**
 * @param {number} n
 * @return {number}
 * @see https://leetcode-cn.com/problems/2-keys-keyboard/
 */
var minSteps = function (n) {
	let count = 0
	for (let index = 2; index <= n; index++) {
		let ans = 0
		while (n % index === 0) {
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
		if ((index & 1) === 0) {
			high = index
		}
		arr[index] = arr[index - high] + 1
	}
	return arr
}

// console.log(countBits(5))

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/UHnkqh/submissions/
 */
var reverseList = function (head) {
	let prev = head
	let current = head && head.next
	let next = current && current.next
	while (current) {
		current.next = prev
		prev = current
		current = next
		next = next && next.next
	}

	head.next = null
	return prev
}

/**
 * @param {number[]} nums
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/NUPfPr/submissions/
 */
var canPartition = function (nums) {
	let count = 0
	let i = 0
	while (i < nums.length) {
		count += nums[i]
		i++
	}

	if ((count & 1) !== 0) return false

	const target = count / 2
	const result = Array(target + 1).fill(false)
	result[0] = true
	for (let i = 0; i < nums.length; i++) {
		for (let j = target; j >= nums[i]; j--) {
			result[j] = result[j] || result[j - nums[i]]
		}
	}
	return result.pop()
}

// console.log(canPartition([1, 2, 5]))

/**
 * @param {number[][]} edges
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/7LpjUW/
 */
var findRedundantConnection = function (edges) {
	// 假设每个人都是root
	const p = Array(edges.length).fill(-1)

	const find = index => {
		while (true) {
			if (p[index] > 0) index = p[index]
			else return index
		}
	}

	const union = (root1, root2) => {
		p[root2] = root1
	}

	for (let i = 0; i < edges.length; i++) {
		const root1 = find(edges[i][0])
		const root2 = find(edges[i][1])

		if (root1 !== root2) union(root1, root2)
		else return edges[i]
	}

	return [0]
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
	// let i = 0
	// let j = numbers.length - 1
	// while (i < j) {
	// 	const _target = numbers[i] + numbers[j]
	// 	if (_target === target) return [i, j]
	// 	if (_target > target) j--
	// 	else i++
	// }
	let map = {}
	let i = 0
	while (i < numbers.length) {
		let c = numbers[i]
		let v = target - c
		if (v in map) return [map[v], i]
		else {
			if (!(c in map)) map[c] = i
		}
		i++
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

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/PzWKhm/
 */
var rob = function (nums) {
	// 动态规划
	const len = nums.length
	if (len === 1) return nums[0]

	const dp = Array(len).fill(0)

	dp[0] = nums[0]
	dp[1] = Math.max(nums[0], nums[1])
	for (let i = 2; i < len - 1; i++) {
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
	}

	const result1 = dp[len - 2]
	dp[1] = nums[1]
	dp[2] = Math.max(nums[1], nums[2])
	for (let i = 3; i < len; i++) {
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
	}
	const result2 = dp[len - 1]
	return Math.max(result1, result2)
}
// console.log(rob([6, 8, 1, 6, 5]))

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/lMSNwu/
 */
var addTwoNumbers = function (l1, l2) {
	let queue1 = []
	let queue2 = []
	while (l1) {
		queue1.unshift(l1.val)
		l1 = l1.next
	}
	while (l2) {
		queue2.unshift(l2.val)
		l2 = l2.next
	}

	;[queue1, queue2] = queue1.length > queue2.length ? [queue1, queue2] : [queue2, queue1]

	console.log(queue1, queue2)
	let queue3 = []
	for (let i = 0; i < queue2.length; i++) {
		const result = queue1[i] + queue2[i] + (queue3[i] || 0)
		console.log(queue3, result)
		if (result >= 10) {
			queue3[i] = result - 10
			queue3[i + 1] = 1
		} else queue3[i] = result
	}

	for (let i = queue2.length; i < queue1.length; i++) {
		const result = queue1[i] + (queue3[i] || 0)
		if (result >= 10) {
			queue3[i] = result - 10
			queue3[i + 1] = 1
		} else queue3[i] = result
	}

	let l3 = new ListNode()
	let _l3 = l3
	while (queue3.length) {
		const node = queue3.pop()
		_l3.val = node
		_l3.next = new ListNode()
		_l3 = _l3.next
	}
	return l3
}

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * @see https://leetcode-cn.com/problems/JFETK5/submissions/
 */
var addBinary = function (a, b) {
	;[a, b] = a.length > b.length ? [a, b] : [b, a]
	let n = a.length
	let m = b.length

	let top = 0
	let result = ''
	for (let i = 0; i < m; i++) {
		let sum = ~~a[n - 1 - i] + ~~b[m - 1 - i] + top
		if (sum >= 2) {
			top = 1
			sum -= 2
		} else {
			top = 0
		}
		result = sum + result
	}
	for (let i = 0; i < n - m; i++) {
		let sum = ~~a[n - 1 - i - m] + top
		if (sum >= 2) {
			top = 1
			sum -= 2
		} else {
			top = 0
		}
		result = sum + result
	}

	if (top) {
		result = 1 + result
	}

	return result
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/ZVAVXX/submissions/
 */
var numSubarrayProductLessThanK = function (nums, k) {
	const len = nums.length
	let count = 0

	for (let i = 0; i < len; i++) {
		let mut = 1
		for (let j = i; j < len; j++) {
			mut *= nums[j]
			if (mut < k) count++
			else break
		}
	}

	return count
}
// console.log(numSubarrayProductLessThanK([10, 5, 2, 6, 7], 100))

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/7WHec2/
 */
var sortList = function (head) {
	if (!head) return head
	let map1 = {}
	let map2 = {}
	while (head) {
		const key = head.val
		console.log(key)
		if (key >= 0) {
			if (key in map1) map1[key]++
			else map1[key] = 1
		}
		if (key < 0) {
			if (key in map2) map2[-key]++
			else map2[-key] = 1
		}

		head = head.next
	}
	const result = []
	for (const key in map1) {
		result.push(...Array(map1[key]).fill(+key))
	}
	console.log({ map2 })
	for (const key in map2) {
		result.unshift(...Array(map2[key]).fill(-key))
	}

	let l = new ListNode(result[0])
	let i = 1
	let _l = l
	while (i < result.length) {
		_l.next = new ListNode(result[i])
		_l = _l.next
		i++
	}

	console.log(result)

	return l
}

let l = new ListNode(4)
l.next = new ListNode(2)
l.next.next = new ListNode(1)
l.next.next.next = new ListNode(3)
l.next.next.next.next = new ListNode(-3)
l.next.next.next.next.next = new ListNode(-3)

// sortList(l)
const count = arr => {
	console.time('count')
	let map1 = {}
	let i = 0
	while (i < arr.length) {
		const key = arr[i]
		if (key in map1) map1[key]++
		else map1[key] = 1

		i++
	}
	const result = []
	for (const key in map1) {
		console.log(key)
		result.push(...Array(map1[key]).fill(+key))
	}
	console.timeEnd('count')
}

const quai = arr => {
	console.time('quai')
	const doo = (low, high) => {
		let i = low
		let j = high
		let x = arr[low]
		if (i > j) return
		while (i < j) {
			while (i < j && arr[j] > x) j--
			while (i < j && arr[i] <= x) i++

			if (i < j) {
				const temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}

		arr[low] = arr[i]
		arr[i] = x
		doo(low, i - 1)
		doo(i + 1, high)
	}
	doo(0, arr.length - 1)
	console.timeEnd(`quai`)
}
// let arr = Array(100000)
// 	.fill(0)
// 	.map(() => Math.floor(Math.random() * 1000))
// count(arr)
// arr = Array(100000)
// 	.fill(0)
// 	.map(() => Math.floor(Math.random() * 1000))
// quai(arr)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
	let count = 0
	let i = 0
	while (i < nums.length) count += arr[i++]

	if (count % 2 !== 0) return false
	const target = count / 2
	const result = Array(target + 1).fill(false)
	result[0] = true
	for (let i = 0; i < nums.length; i++) {
		for (let j = nums[i]; j <= target; j++) {
			result[j] = result[j] || result[j - nums[i]]
		}
	}

	return result.pop()
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/NUPfPr/
 */
var detectCycle = function (head) {
	if (!head) return null
	const map = new Map()
	let h = head
	while (h) {
		if (map.has(h)) return map.get(h)
		map.set(h, h)
		h = h.next
	}
	return null
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/c32eOV/
 */
var detectCycle = function (head) {
	if (!head) return null
	const map = new Map()
	let h = head
	while (h) {
		if (map.has(h)) return map.get(h)
		map.set(h, h)
		h = h.next
	}
	return null
}

/**
 * @param {number[][]} grid
 * @return {number}
 * @see https://leetcode-cn.com/problems/0i0mDW/
 */
var minPathSum = function (grid) {
	let n = grid.length
	let m = grid[0].length
	const result = Array(n)
		.fill(0)
		.map(() => Array(m).fill(0))

	result[0][0] = grid[0][0]
	let i = 1
	while (i < n) result[i][0] = result[i - 1][0] + grid[i++][0]
	i = 1
	while (i < m) result[0][i] = result[0][i - 1] + grid[0][i++]

	for (let i = 1; i < n; i++) {
		for (let j = 1; j < m; j++) {
			result[i][j] = Math.min(result[i - 1][j], result[i][j - 1]) + grid[i][j]
		}
	}
	return result[n - 1][m - 1]
}

// minPathSum([
// 	[1, 3, 1],
// 	[1, 5, 1],
// 	[4, 2, 1]
// ])

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/A1NYOS/submissions/
 */
var findMaxLength = function (nums) {
	const map = new Map()
	map.set(0, -1)

	let count = 0
	let max = 0
	for (let i = 0; i < nums.length; i++) {
		if (nums[i]) count++
		else count--

		if (map.has(count)) {
			const prev = map.get(count)
			max = Math.max(max, i - prev)
		} else map.set(count, i)
	}

	return max
}

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val
	this.left = left === undefined ? null : left
	this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number}
 * @see https://leetcode-cn.com/problems/3Etpl5/
 */
var sumNumbers = function (root) {
	const arr = []

	let result = 0
	const dfs = node => {
		if (!node) return
		arr.push(node.val)
		if (!node.left && !node.right) {
			result += arr.reduce((sum, v, i) => sum + v * 10 ** i, 0)
			arr.pop()
			return
		}

		dfs(node.left)
		dfs(node.right)
		arr.pop()
	}

	dfs(root)

	return result
}

const root = new TreeNode(4)
root.left = new TreeNode(9)
root.right = new TreeNode(0)
root.left.left = new TreeNode(5)
root.left.right = new TreeNode(1)
// sumNumbers(root)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/g5c51o/
 */
var topKFrequent = function (nums, k) {
	let map = new Map()

	let i = 0
	while (i < nums.length) {
		map.set(nums[i], map.get(nums[i++]) + 1 || 1)
	}

	class Heap {
		constructor() {
			this.arr = []
		}

		change(i, j) {
			const temp = this.arr[i]
			this.arr[i] = this.arr[j]
			this.arr[j] = temp
		}

		insert([key, count]) {
			this.arr.push([key, count])
			let i = this.arr.length - 1
			while (i >= 0) {
				const pi = i % 2 === 0 ? (i - 2) / 2 : (i - 1) / 2
				if (pi < 0) break
				if (this.arr[pi][1] < count) {
					this.change(pi, i)
					i = pi
				} else break
			}
		}

		delete() {
			if (!this.arr.length) return
			const top = this.arr[0]
			const bottom = this.arr.pop()
			if (!this.arr.length) return top
			this.arr[0] = bottom

			let i = 0
			while (i < this.arr.length) {
				const p = this.arr[i]
				const l = this.arr[i * 2 + 1]
				const r = this.arr[i * 2 + 2]

				if (l && (r === undefined || l[1] >= r[1]) && l[1] > p[1]) {
					this.change(i, i * 2 + 1)
					i = i * 2 + 1
					continue
				}

				if (r && r[1] > l[1] && r[1] > p[1]) {
					this.change(i, i * 2 + 2)
					i = i * 2 + 2
					continue
				}

				break
			}

			return top
		}
	}

	const h = new Heap()
	console.log(map)

	map.forEach((v, k) => h.insert([k, v]))
	console.log(h.arr)

	const result = []

	while (result.length < k) {
		const v = h.delete()
		if (!v) return result
		result.push(v[0])
	}
	return result
}

// console.log(topKFrequent([1, 1, 2, 2, 3, 2, 3, 3], 2))

/**
 * @param {string} str
 * @param {number} i
 * @return {string[]}
 */
const getNextStr = (str, i) => {
	const c = str[i]
	let c1 = ~~c + 1
	let c2 = ~~c - 1
	if (c === '0') {
		c1 = 1
		c2 = 9
	}
	if (c === '9') {
		c1 = 8
		c2 = 0
	}
	const str1 = str.substr(0, i) + c1 + str.substr(i + 1)
	const str2 = str.substr(0, i) + c2 + str.substr(i + 1)
	console.log(str1, str2)

	return [str1, str2]
}
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 * @see https://leetcode-cn.com/problems/zlDJc7/
 */
var openLock = function (deadends, target) {
	if (target === '0000') return 0
	const dead = new Set(deadends)
	if (dead.has('0000')) return -1
	const queue = []
	const created = new Set()
	queue.push('0000')
	created.add('0000')
	let step = 0
	while (queue.length) {
		const currentLen = queue.length
		let i = 0
		step++
		while (i < currentLen) {
			const str = queue.shift()
			let j = 0
			while (j < 4) {
				const [str1, str2] = getNextStr(str, j)
				if (str1 === target || str2 === target) return step
				if (!dead.has(str1) && !created.has(str1)) {
					queue.push(str1)
					created.add(str1)
				}
				if (!dead.has(str2) && !created.has(str2)) {
					queue.push(str2)
					created.add(str2)
				}
				j++
			}
			i++
		}
	}

	return -1
}
// console.log(openLock(['7777'], '1009'))

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
	let i = m - 1
	let j = n - 1
	let k = m + n - 1

	while (i >= 0 || j >= 0) {
		if (i < 0) nums1[k--] = nums2[i--]
		else if (j < 0) nums1[k--] = nums2[j--]
		else if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--]
		else nums1[k--] = nums1[j--]
	}
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 * @see https://leetcode-cn.com/problems/invert-binary-tree/
 */
var invertTree = function (root) {
	if (!root) return
	const left = invertTree(root.left)
	const right = invertTree(root.right)
	root.left = right
	root.right = left
	return root
}

/**
 * @param {number[][]} matrix
 * @see https://leetcode-cn.com/problems/O4NDxx/submissions/
 */
var NumMatrix = function (matrix) {
	let m = matrix.length
	let n = matrix[0].length
	this.arr = Array(m)
		.fill(0)
		.map(() => Array(n).fill(0))

	this.arr[0][0] = matrix[0][0]
	for (let i = 1; i < m; i++) this.arr[i][0] = this.arr[i - 1][0] + matrix[i][0]
	for (let i = 1; i < n; i++) this.arr[0][i] = this.arr[0][i - 1] + matrix[0][i]

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			this.arr[i][j] = this.arr[i - 1][j] + this.arr[i][j - 1] - this.arr[i - 1][j - 1] + matrix[i][j]
		}
	}

	console.log(this.arr)

	this.matrix = matrix
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
	const arr = this.arr
	if (row1 === 0 && col1 === 0) return arr[row2][col2]
	if (row1 === 0) return arr[row2][col2] - arr[row2][col1 - 1]
	if (col1 === 0) return arr[row2][col2] - arr[row1 - 1][col2]
	return arr[row2][col2] + arr[row1 - 1][col1 - 1] - arr[row1 - 1][col2] - arr[row2][col1 - 1]
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/uUsW3B/
 */
var combine = function (n, k) {
	const result = []
	const fn = nums => {
		for (let i = nums[nums.length - 1] || 1; i <= n; i++) {
			if (nums.find(item => item === i)) continue
			nums.push(i)
			if (nums.length === k) {
				result.push([...nums])
				nums.pop()
				continue
			}
			fn([...nums])
			nums.pop()
		}
	}

	fn([])
	return result
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/SLwz0R/
 */
var removeNthFromEnd = function (head, n) {
	if (!head) return head
	let next = head
	let last = head

	let i = n
	while (i--) next = next.next

	while (next) {
		next = next.next
		last = last.next
	}
	last.next = last.next.next
	return head
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/VabMRr/
 */
var findAnagrams = function (s, p) {
	const map = {}
	let i = 0
	while (i < p.length) map[p[i]] = map[p[i++]] + 1 || 1

	let prev = 0
	const result = []
	const win = {}
	let valid = 0
	for (let i = 0; i < s.length; i++) {
		const c = s[i]
		if (map[c]) {
			win[c] = win[c] + 1 || 1
			if (win[c] === map[c]) valid++
		}

		if (i - prev !== p.length - 1) continue
		if (valid === Object.keys(map).length) {
			result.push(prev)
		}
		prev++
		const last = s[prev - 1]
		if (last in map) {
			if (map[last] === win[last]) valid--
		}
		win[last]--
	}

	return result
}

/**
 * @param {string} s
 * @return {number}
 * @see https://leetcode-cn.com/problems/cyJERH/
 */
var minFlipsMonoIncr = function (s) {
	var len = s.length
	var head = s.indexOf('1')
	var one = 0
	var zero = 0
	for (var i = head; i < len; i++) {
		if (s[i] === '0') {
			zero++
			if (one < zero) zero = one
		} else one++
	}
	return Math.min(zero, one)
}

/**
 * @param {number} x
 * @return {number}
 * @see https://leetcode-cn.com/problems/jJ0w9p/
 */
var mySqrt = function (x) {
	const find = (low, high) => {
		if (high === low) return high
		if (high === low + 1) {
			if (high ** 2 > x && low ** 2 < x) return low
			return high
		}

		const middle = low + Math.floor((high - low) / 2)
		const _x = middle ** 2
		if (_x === x) return middle
		if (_x > x) return find(low, middle)
		return find(middle, high)
	}

	return find(1, x)
}

/**
 * @param {string[]} matrix
 * @return {number}
 * @see https://leetcode-cn.com/problems/PLYXKQ/
 */
var maximalRectangle = function (matrix) {
	let len1 = matrix.length
	if (!len1) return 0
	let len2 = matrix[0].length

	let arr = Array(len1)
		.fill(0)
		.map(() =>
			Array(len2)
				.fill(0)
				.map(() => [0, 0]),
		)
	arr[0][0] = [~~matrix[0][0], ~~matrix[0][0]]

	for (let i = 1; i < len1; i++) {
		const c = matrix[i][0]
		if (c === '0') arr[i][0] = [0, 0]
		else {
			const prev = arr[i - 1][0]
			arr[i][0] = [prev[0] + 1, 1]
		}
	}

	for (let i = 1; i < len2; i++) {
		const c = matrix[0][i]
		if (c === '0') arr[0][i] = [0, 0]
		else {
			const prev = arr[0][i - 1]
			arr[0][i] = [1, prev[1] + 1]
		}
	}

	for (let i = 1; i < len1; i++) {
		for (let j = 1; j < len2; j++) {
			const c = matrix[i][j]
			if (c === '0') arr[i][j] = [0, 0]
			else {
				const prev1 = arr[i - 1][j]
				const prev2 = arr[i][j - 1]
				arr[i][j] = [prev1[0] + 1, prev2[1] + 1]
			}
		}
	}

	let max = ~~matrix[0][0]
	for (let i = 0; i < len1; i++) {
		for (let j = 0; j < len2; j++) {
			let [maxI, maxJ] = arr[i][j]
			if (!maxI) continue

			let minj = maxJ
			for (let k = 0; k < maxI; k++) {
				const last = arr[i - k][j]
				minj = Math.min(minj, last[1])
				max = Math.max(max, (k + 1) * minj)
			}
		}
	}

	return max
}
// console.log(maximalRectangle(['1101', '1101', '1111']))

/**
 * @param {number[]} asteroids
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/XagZNi/
 */
var asteroidCollision = function (asteroids) {
	const stack = []
	const result = []
	let index = asteroids.findIndex(item => item > 0)
	if (~index) result.push(...asteroids.slice(0, index))
	else return asteroids

	while (index < asteroids.length) {
		const e = asteroids[index]
		if (e >= 0) stack.push(e)
		else {
			while (true) {
				if (!stack.length) {
					result.push(e)
					break
				}
				const last = stack[stack.length - 1]
				if (last > -e) break
				if (last === -e) {
					stack.pop()
					break
				}
				if (last < -e) stack.pop()
			}
		}
		index++
	}

	result.push(...stack)
	return result
}
// console.log(asteroidCollision([-2, -2, 1, -2]))

/**
 * @param {string} s
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/XltzEq/
 */
var isPalindrome = function (s) {
	const res = []
	let i = 0
	while (i < s.length) {
		if (/[a-zA-Z]/.test(s[i])) res.push(s[i].toLowerCase())
		i++
	}

	i = 0
	let bool = true
	while (true) {
		let next = res.length - 1 - i
		if (next < i) break
		if (res[i] !== res[next]) {
			bool = false
			break
		}
		i++
	}

	return bool
}
// console.log(isPalindrome('aaaaa'));

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/7WqeDu/
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) return true
		}
	}

	return false
}
// console.log(containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3))

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/vvXgSW/
 */
var mergeKLists = function (lists) {
	let len = lists.length
	if (!len) return null
	if (len === 1) return lists[0]

	let m1 = {}
	let m2 = {}

	for (let i = 0; i < len; i++) {
		let l = lists[i]
		while (l) {
			if (l.val >= 0) {
				if (l.val in m1) m1[l.val].push(l)
				else m1[l.val] = [l]
			} else {
				if (-l.val in m2) m2[-l.val].push(l)
				else m2[-l.val] = [l]
			}
			l = l.next
		}
	}
	let head = new ListNode(Infinity)
	let li = head
	for (const key in m1) {
		for (let i = 0; i < m1[key].length; i++) {
			head.next = m1[key][i]
			head = head.next
		}
	}

	let head2 = new ListNode(Infinity)
	let prev = head2
	let li2 = head2
	for (const key in m2) {
		for (let i = 0; i < m2[key].length; i++) {
			li2 = m2[key][i]
			if (prev.val === Infinity) prev = li2
			li2.next = head2
			head2 = li2
		}
	}

	prev.next = li.next
	return li2
}

/**
 * @param {number} n
 * @return {number}
 * @see https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/submissions/
 */
var findNthDigit = function (n) {
	if (n < 10) return n
	for (let i = 0; i < 32; i++) {
		let now = (i + 1) * 9 * 10 ** i
		if (now < n) {
			n -= now
			continue
		}
		const wei = 10 ** i + Math.ceil(n / (i + 1)) - 1
		return ~~wei.toString(10)[(n - 1) % (i + 1)]
	}
}
// console.log(findNthDigit(13))
/**
 * @param {number[][]} matrix
 * @return {number}
 * @see https://leetcode-cn.com/problems/fpTFWP/
 */
var longestIncreasingPath = function (matrix) {
	const m = matrix.length
	const n = matrix[0].length
	// 0 max 1 min
	const arr = Array(m)
		.fill(0)
		.map(() => Array(n).fill(0))

	const ops = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	]
	const dfs = (i, j) => {
		if (arr[i][j]) return arr[i][j]
		arr[i][j]++
		for (let k = 0; k < ops.length; k++) {
			const newi = i + ops[k][0]
			const newj = j + ops[k][1]
			if (newi >= 0 && newj >= 0 && newi < m && newj < n && matrix[newi][newj] > matrix[i][j]) {
				arr[i][j] = Math.max(arr[i][j], dfs(newi, newj) + 1)
			}
		}

		return arr[i][j]
	}

	let max = 0
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			max = Math.max(max, dfs(i, j))
		}
	}

	return max
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/dKk3P7/
 */
var isAnagram = function (s, t) {
	if (s === t) return false
	if (s.length !== t.length) return false

	let m1 = {}
	let m2 = {}

	for (const k of s) {
		if (k in m1) m1[k]++
		else m1[k] = 1
	}
	for (const k of t) {
		if (k in m2) m2[k]++
		else m2[k] = 1
	}

	if (Object.keys(m1).length !== Object.keys(m2).length) return false

	for (const k in m1) {
		if (m1[k] !== m2[k]) return false
	}

	return true
}

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/IY6buf/
 */
var isInterleave = function (s1, s2, s3) {
	const n = s1.length
	const m = s2.length
	if (n + m != s3.length) return false
	// dp 路径
	let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(false))
	// dp[i][j] : 长度为[i+j]的s3前缀 能否由 长度为i的s1前缀 与 长度为j的s2前缀 交织组成
	// 先处理一下 i/j 取0 的情况
	dp[0][0] = true
	for (let i = 1; i < n + 1; i++) {
		if (s1[i - 1] == s3[i - 1]) dp[i][0] = true
		else break
	}
	for (let j = 1; j < m + 1; j++) {
		if (s2[j - 1] == s3[j - 1]) dp[0][j] = true
		else break
	}
	for (let i = 1; i < n + 1; i++) {
		for (let j = 1; j < m + 1; j++) {
			dp[i][j] = (s1[i - 1] == s3[i + j - 1] && dp[i - 1][j]) || (s2[j - 1] == s3[i + j - 1] && dp[i][j - 1])
		}
	}
	return dp[n][m]
}

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/skFtm2/
 */
var singleNonDuplicate = function (nums) {
	if ((nums.length & 1) === 0) return -1
	const binary = (low, high) => {
		const m = low + Math.floor((high - low) / 2)
		if (m === 0 || m === nums.length - 1) return m
		if (nums[m] !== nums[m + 1] && nums[m] !== nums[m - 1]) return m
		if (low + 1 === high) {
			if (nums[low] === nums[low - 1]) return high
			return low
		}
		if ((m & 1) === 0 && nums[m] === nums[m - 1]) return binary(low, m)
		if ((m & 1) !== 0 && nums[m] !== nums[m - 1]) return binary(low, m)
		if ((m & 1) === 0 && nums[m] === nums[m + 1]) return binary(m, high)
		if ((m & 1) !== 0 && nums[m] !== nums[m + 1]) return binary(m, high)
	}
	return binary(0, nums.length - 1)
}

/**
 * @param {number[]} w
 * @see https://leetcode-cn.com/problems/cuyjEf/
 */
var Solution = function (w) {
	this.arr = Array(w.length).fill(0)
	this.arr[0] = w[0]
	let i = 1
	while (i < w.length) this.arr[i] = this.arr[i - 1] + w[i++]
	this.w = w
}

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
	if (this.arr.length === 1) return 0
	const num = Math.floor(Math.random() * this.arr[this.arr.length - 1]) + 1

	let left = 0
	let right = this.arr.length - 1
	while (left < right) {
		let m = left + Math.floor((right - left) / 2)
		if (this.arr[m] < num) left = m + 1
		else right = m
	}
	return left
}

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
	const m = s.length,
		n = t.length
	const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
	dp[0][0] = 1
	for (let i = 0; i < m; i++) {
		dp[i + 1][0] = 1
		for (let j = 0; j <= i && j < n; j++) {
			if (s[i] === t[j]) {
				dp[i + 1][j + 1] = dp[i][j] + dp[i][j + 1]
			} else {
				dp[i + 1][j + 1] = dp[i][j + 1]
			}
		}
	}
	return dp[m][n]
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 * @see https://leetcode-cn.com/problems/LGjMqU/
 */
var reorderList = function (head) {
	if (!head || !head.next || !head.next.next) return

	let li = head
	let arr = []
	while (li) {
		arr.push(li)
		li = li.next
	}

	let i = 0
	let j = arr.length - 1
	while (i <= j) {
		if (i === j) {
			arr[i].next = null
			return
		}

		arr[i].next = arr[j]
		if (i + 1 !== j) arr[j].next = arr[i + 1]
		else {
			arr[j].next = null
			return
		}
		i++
		j--
	}
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/xx4gT2/
 */
var findKthLargest = function (nums, k) {
	const change = (i, j) => {
		const temp = nums[i]
		nums[i] = nums[j]
		nums[j] = temp
	}

	let max
	const sort = (low, high) => {
		let i = low
		let j = high
		let x = nums[low]
		if (low > high) {
			return
		}

		while (i < j) {
			while (i < j && nums[j] < x) j--
			while (i < j && nums[i] >= x) i++
			if (i < j) change(i, j)
		}
		nums[low] = nums[i]
		nums[i] = x
		if (k - 1 === i) {
			max = nums[i]
			return
		}
		if (k - 1 < i) sort(low, i - 1)
		else sort(i + 1, high)
	}
	sort(0, nums.length - 1)
	return max
}

/**
 * @param {string} s
 * @return {string[]}
 * @see https://leetcode-cn.com/problems/0on3uN/
 */
var restoreIpAddresses = function (s) {
	let str
	let arr = []
	const dfs = (k, prev) => {
		let i = k + 1
		let str = s.substr(k)
		if (prev.length === 3) {
			if (str.length === 1 || (str.length > 1 && str[0] !== '0' && +str < 256)) arr.push([...prev, str].join('.'))
			return
		}

		while (true) {
			let str = s.substring(k, i)
			if (+str >= 256 || (str.length > 1 && str[0] === '0') || i >= s.length) break
			else dfs(i++, [...prev, str])
		}
	}
	dfs(0, [])
	return arr
}
// restoreIpAddresses('0000')

/**
 * @param {number[]} heights
 * @return {number}
 * @see https://leetcode-cn.com/problems/0ynMMM/
 */
var largestRectangleArea = function (heights) {
	let stack = [-1]
	let maxArea = 0
	for (let i = 0; i < heights.length; i++) {
		// 当前柱子的高度小于位于栈顶的柱子的高度
		while (stack[stack.length - 1] != -1 && heights[stack[stack.length - 1]] >= heights[i]) {
			// 以栈顶的柱子为高度计算面积
			let height = heights[stack.pop()]
			let width = i - stack[stack.length - 1] - 1
			maxArea = Math.max(maxArea, height * width)
		}
		// 当前柱子的高度大于位于栈顶的柱子的高度  入栈
		stack.push(i)
	}
	// 计算末尾
	while (stack[stack.length - 1] != -1) {
		let height = heights[stack.pop()]
		let width = heights.length - stack[stack.length - 1] - 1
		maxArea = Math.max(maxArea, height * width)
	}
	return maxArea
}

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/tvdfij/
 */
var pivotIndex = function (nums) {
	const total = nums.reduce((a, v) => a + v, 0)
	let sum = 0
	for (let i = 0; i < nums.length; i++) {
		if (2 * sum + nums[i] === total) return i
		sum += nums[i]
	}
	return -1
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @see https://leetcode-cn.com/problems/YaVDxD/
 */
var findTargetSumWays = function (nums, target) {
	let count = 0

	let dfs = (i, v) => {
		if (i < nums.length - 1) {
			dfs(i + 1, v + nums[i])
			dfs(i + 1, v - nums[i])
		}
		if (i === nums.length - 1 && v + nums[i] === target) count++
		if (i === nums.length - 1 && v - nums[i] === target) count++
	}

	dfs(0, 0)

	return count
}

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * @see https://leetcode-cn.com/problems/qJnOS7/
 */
var longestCommonSubsequence = function (text1, text2) {}

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/TVdhkn/
 */
var subsets = function (nums) {
	const result = []

	const dfs = (k, arr) => {
		result.push(arr)
		for (let i = k + 1; i < nums.length; i++) {
			dfs(i, [...arr, nums[i]])
		}
	}
	dfs(-1, [])
	console.log(result)
	return result
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @see https://leetcode-cn.com/problems/D0F0SV/
 */
var combinationSum4 = function (nums, target) {
	const dp = new Array(target + 1).fill(0)
	dp[0] = 1
	for (let i = 1; i <= target; i++) {
		for (const num of nums) {
			if (num <= i) {
				dp[i] += dp[i - num]
			}
		}
	}
	return dp[target]
}
// console.log(combinationSum4([2, 1, 3], 35))

/**
 * @param {number[][]} mat
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/2bCMpM/
 */
var updateMatrix = function (mat) {
	let m = mat.length
	let n = mat[0].length

	let result = Array(m)
		.fill(0)
		.map(() => Array(n).fill(Infinity))

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (mat[i][j] === 0) result[i][j] = 0
			else {
				let r = j - 1 < 0 ? Infinity : result[i][j - 1]
				let l = i - 1 < 0 ? Infinity : result[i - 1][j]
				result[i][j] = Math.min(r, j) + 1
			}
		}
	}
	console.log(result)
	for (let i = m - 1; i >= 0; i--) {
		for (let j = n - 1; j >= 0; j--) {
			if (mat[i][j] === 0) result[i][j] = 0
			else {
				let r = j + 1 >= m ? Infinity : result[i][j + 1]
				let l = i + 1 >= n ? Infinity : result[i + 1][j]
				result[i][j] = Math.min(result[i][j], r + 1, j + 1)
			}
		}
	}

	return result
}

// Definition for a Node.
// @ts-ignore
function Node(val, prev, next, child) {
	this.val = val
	this.prev = prev
	this.next = next
	this.child = child
}
/**
 * @param {Node} head
 * @return {Node}
 * @see https://leetcode-cn.com/problems/Qv1Da2/
 */
var flatten = function (head) {
	if (!head) return head
	let arr = []
	let dfs = node => {
		arr.push(node)
		while (node) {
			if (node.child) {
				dfs(node.child)
			}
			node = node.next
		}
	}
	dfs(head)

	for (let i = 1; i < arr.length; i++) {
		arr[i - 1].next = arr[i]
		arr[i].prev = arr[i - 1]
		arr[i].child = null
	}

	arr[0].child = null

	return arr[0]
}

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/2VG8Kg/
 */
var minSubArrayLen = function (target, nums) {
	const len = nums.length
	if (len === 0) {
		return len
	}
	let start = 0,
		end = 0,
		sum = 0,
		res = Infinity
	while (end < len) {
		sum += nums[end]
		while (sum >= target) {
			res = Math.min(end - start + 1, res)
			sum -= nums[start]
			start++
		}
		end++
	}
	return res === Infinity ? 0 : res
}

/**
 * @param {number[][]} triangle
 * @return {number}
 * @see https://leetcode-cn.com/problems/IlPe0q/
 */
var minimumTotal = function (triangle) {
	let len = triangle.length
	if (len === 1) return triangle[0][0]
	let arr = []
	arr[0] = triangle[0][0]
	let i = 1
	while (i < len) {
		let j = triangle[i].length - 1
		while (j >= 0) {
			arr[j] =
				Math.min(arr[j] === undefined ? Infinity : arr[j], arr[j - 1] === undefined ? Infinity : arr[j - 1]) +
				triangle[i][j]
			j--
		}
		i++
	}

	return Math.min(...arr)
}

/**
 * @param {string} s
 * @return {string[][]}
 * @see https://leetcode-cn.com/problems/M99OJA/
 */
var partition = function (s) {
	let len = s.length
	if (len <= 1) return [[s]]
	const result = []

	const test = s => {
		let i = 0
		let j = s.length - 1
		while (i < j) {
			if (s[i++] !== s[j--]) return false
		}
		return true
	}

	const dfs = (i, arr) => {
		let str = ''
		for (; i < len; i++) {
			str += s[i]
			if (test(str)) {
				arr.push(str)
				if (i === len - 1) {
					result.push([...arr])
				} else {
					dfs(i + 1, arr)
				}
				arr.pop(str)
			}
		}
	}

	dfs(0, [])
	console.log(result)
	return result
}
// partition('google')

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 * @see https://leetcode-cn.com/problems/6eUYwP/
 */
var pathSum = function (root, targetSum) {
	const map = new Map()
	map.set(0, 1)
	let sum = 0
	let count = 0
	const dfs = node => {
		if (!node) return
		sum += node.val
		count += map.get(sum - targetSum) || 0
		map.set(sum, map.get(sum) + 1 || 1)
		dfs(node.left)
		dfs(node.right)
		map.set(sum, map.get(sum) - 1)
		sum -= node.val
	}

	dfs(root)
	return count
}

/**
 * @param {number} k
 * @param {number[]} nums
 * @see https://leetcode-cn.com/problems/jBjn9C/
 */
var KthLargest = function (k, nums) {
	const change = (arr, i, j) => {
		const temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}

	class Head {
		constructor(arr, k) {
			this.arr = arr
			this.minArr = []
			this.k = k
			this.build()
		}

		build() {
			for (let val of this.arr) {
				this.insert(val)
			}
		}

		insert(data) {
			this.minArr.push(data)
			let len = this.minArr.length - 1
			while (len > 0) {
				let pi = len % 2 == 0 ? (len - 2) / 2 : (len - 1) / 2
				if (this.minArr[pi] > data) {
					change(this.minArr, pi, len)
					len = pi
					continue
				}
				break
			}

			if (this.minArr.length > k) {
				this.delete()
			}

			return this.minArr[0]
		}

		delete() {
			if (!this.minArr.length) return
			let top = this.minArr[0]
			let bottom = this.minArr.pop()
			if (!this.minArr.length) return top

			this.minArr[0] = bottom

			let i = 0
			while (i < this.minArr.length) {
				let p = this.minArr[i]
				let l = this.minArr[i * 2 + 1]
				let r = this.minArr[i * 2 + 2]

				if ((r === undefined || l <= r) && l < p) {
					change(this.minArr, i, i * 2 + 1)
					i = i * 2 + 1
					continue
				}
				if (l > r && r < p) {
					change(this.minArr, i, i * 2 + 2)
					i = i * 2 + 2
					continue
				}
				break
			}

			return top
		}
	}

	this.head = new Head(nums, k)
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
	return this.head.insert(val)
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 * @see https://leetcode-cn.com/problems/w6cpku/
 */
var convertBST = function (root) {
	let sum = 0
	const dfs = node => {
		if (!node) return 0
		dfs(node.right)
		sum += node.val
		node.val = sum
		dfs(node.left)
	}

	dfs(root)
	return root
}

/**
 * @param {TreeNode} root
 * @return {number}
 * @see https://leetcode-cn.com/problems/LwUNpT/
 */
var findBottomLeftValue = function (root) {
	let k = 0
	let minK = 0
	let val
	const dfs = node => {
		if (!node) return
		k++
		dfs(node.left)
		if (k > minK) {
			minK = k
			val = node.val
		}
		dfs(node.right)
		k--
	}

	dfs(root)
	return val
}

/**
 * @param {number[]} temperatures
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/iIQa4I/
 */
var dailyTemperatures = function (temperatures) {
	let len = temperatures.length
	if (len === 1) return [0]
	const result = Array(len).fill(0)
	let stack = [0]
	let i = 1
	while (i < len) {
		let n = temperatures[i]
		while (stack.length >= 0) {
			let k = stack[stack.length - 1]
			let m = temperatures[k]
			if (m < n) {
				result[k] = i - k
				stack.pop()
				continue
			}
			stack.push(i)
			break
		}
		i++
	}
	return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/hPov7L/
 */
var largestValues = function (root) {
	if (!root) return []
	let arr = []
	let queue = [root]

	while (queue.length) {
		let len = queue.length
		let max = -Infinity
		let i = 0
		while (i < len) {
			let node = queue.shift()
			max = Math.max(max, node.val)
			if (node.left) queue.push(node.left)
			if (node.right) queue.push(node.right)
			i++
		}
		arr.push(max)
	}

	return arr
}
