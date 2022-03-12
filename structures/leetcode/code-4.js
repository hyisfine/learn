/**
 * @param {number[]} nums
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/7p8L0Z/
 */
var permuteUnique = function (nums) {
	let res = []
	let len = nums.length
	nums.sort((a, b) => a - b)
	const dfs = arr => {
		if (arr.length === len) return res.push(arr)
		for (let i = 0; i < len; i++) {
			if (i > 0 && nums[i] === nums[i - 1]) continue
			if (nums[i] === null) continue
			let temp = nums[i]
			nums[i] = null
			dfs([...arr, temp])
			nums[i] = temp
		}
	}
	dfs([])
	return res
}

/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
	let f = Array(n + 1).fill(0)
	for (let i = 2; i <= n; i++) {
		f[i] = Infinity

		for (let j = 1; j * j <= i; j++) {
			if (!(i % j)) {
				f[i] = Math.min(f[i], Math.floor(f[j] + i / j))
				f[i] = Math.min(f[i], Math.floor(f[i / j] + j))
			}
		}
	}
	return f[n]
}

/**
 * @param {number} n
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/w3tCBm/
 */
var countBits = function (n) {
	let dp = Array(n + 1).fill(0)

	let flag = 0
	for (let i = 1; i <= n; i++) {
		if (!(i & (i - 1))) flag = i
		dp[i] = dp[i - flag] + 1
	}

	return dp
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
	let count = 0
	for (const num of nums) count += num
	if (count % 2) return false
	let target = count / 2
	let dp = Array(target + 1).fill(false)
	dp[0] = true
	const n = nums.length

	for (let i = 1; i < n; i++) {
		for (let j = target; i >= nums[i]; j--) {
			dp[j] = dp[j] || dp[j - nums[i]]
		}
	}
}

/**
 * @param {number[][]} edges
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/7LpjUW/
 */
var findRedundantConnection = function (edges) {
	const p = Array(edges.length).fill(0)

	const find = index => {
		if (!p[index]) return index
		return find(p[index])
	}
	const union = (i, j) => (p[j] = i)
	for (const [i, j] of edges) {
		let root1 = find(i)
		let root2 = find(j)
		if (root1 === root2) return [i, j]
		union(root1, root2)
	}
	return [0]
}

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
	let dp = Array(amount + 1).fill(amount + 1)
	dp[0] = 0
	for (let i = 1; i <= amount; i++) {
		for (let j = 0; j < coins.length; j++) {
			if (i >= coins[j]) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
		}
	}
	return dp[amount] > amount ? -1 : dp[amount]
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
	if (!l1 || !l2) return l1 || l2
	let arr1 = []
	let arr2 = []
	let arr3 = []

	while (l1) {
		arr1.unshift(l1)
		l1 = l1.next
	}

	while (l2) {
		arr2.unshift(l2)
		l2 = l2.next
	}
}
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
	let left = 0
	let right = numbers.length - 1
	while (left < right) {
		let sum = numbers[left] + numbers[right]
		if (sum === target) return [left, right]
		if (sum < target) left++
		else right--
	}
}

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
	let dp0 = 0
	let dp1 = 0
	for (let index = 2; index <= cost.length; index++) {
		let temp = dp1
		dp1 = Math.min(dp1 + cost[index - 1], dp0 + cost[index - 2])
		dp0 = temp
	}
	return dp1
}
