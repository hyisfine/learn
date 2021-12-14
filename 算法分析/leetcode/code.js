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
	console.log({map2})
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
