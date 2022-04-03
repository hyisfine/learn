/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
	let set = new Set(nums)
	let max = 0

	for (const num of set) {
		if (!set.has(num - 1)) {
			let index = 1
			let __num = num

			while (set.has(__num + 1)) {
				index++
				__num++
			}

			max = Math.max(max, index)
		}
	}

	return max
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
	let len = nums.length
	let res = []
	let arr = []
	const dfs = () => {
		if (arr.length === len) return res.push([...arr])
		for (let i = 0; i < len; i++) {
			if (nums[i] === Infinity) continue
			let val = nums[i]
			nums[i] = Infinity
			arr.push(val)
			dfs()
			arr.pop()
			nums[i] = val
		}
	}
	dfs()

	return res
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	let res = []
	let len = nums.length
	nums.sort((a, b) => a - b)
	if (len < 3 || nums[0] > 0 || nums[len - 1] < 0) return res

	for (let i = 0; i < len; i++) {
		const num = nums[i]
		if (i > 0 && num === nums[i - 1]) continue
		if (num > 0) return res
		let left = i + 1
		let right = len - 1

		while (left < right) {
			let sum = num + nums[left] + nums[right]
			if (sum === 0) {
				res.push([num, nums[left], nums[right]])
				while (left < right && nums[left] === nums[left + 1]) left++
				while (left < right && nums[right] === nums[right - 1]) right--
				left++
				right--
				continue
			}
			if (sum < 0) left++
			if (sum > 0) right--
		}
	}

	return res
}

var findTarget = function (root, k) {
	let set = new Set()
	let flag = false
	const dfs = node => {
		if (!node) return
		if (set.has(k - node.val)) return (flag = true)
		set.add(node.val)
		dfs(node.left)
		dfs(node.right)
	}
	return flag
}

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
	let m = text1.length
	let n = text2.length
	if (!m || !n) return 0

	let dp = Array(m + 1)
		.fill(0)
		.map(() => Array(n + 1).fill(0))

	for (let i = 1; i <= m; i++) {
		let s1 = text1[i - 1]
		for (let j = 1; j <= n; j++) {
			let s2 = text2[j - 1]
			if (s1 === s2) {
				dp[i][j] = dp[i - 1][j - 1] + 1
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
			}
		}
	}

	return dp[m][n]
}

/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
	let left = 0
	let right = arr.length - 1
	let middle = 0
	while (left < right) {
		middle = left + Math.floor((right - left) / 2)
		if (arr[middle] > arr[middle + 1]) left = middle - 1
		else left = middle + 1
	}
	return middle
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function (root) {
	const dfs = node => {
		if (!node) return true
		let left = dfs(node.left)
		let right = dfs(node.right)
		if (left) node.left = null
		if (right) node.right = null
		return left && right && !node.val
	}
	if (dfs(root)) return null
	return root
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
	let set = new Set()
	let max = -1
	let min = 14
	let zero = 0
	for (const num of nums) {
		if (!num) {
			zero++
			continue
		}
		set.add(num)
		max = Math.max(max, num)
		min = Math.min(min, num)
	}

	return set.size + zero === 5 && max - min === 4
}

var getIntersectionNode = function (headA, headB) {
	if (!headA || !headB) return null
	let a = headA,
		b = headB
	while (a !== b) {
		a = a?.next || headB
		b = b?.next || headA
	}
	return a
}

/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
	let sum = 0
	let res = []
	let arr = []
	const dfs = node => {
		if (!node) return
		sum += node.val
		arr.push(node.val)
		if (!node.left && !node.right && sum === target) {
			res.push([...arr])
		}
		dfs(node.left)
		dfs(node.right)
		sum -= node.val
		arr.pop()
	}
	dfs(root)
	return res
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	let x = nums[0]
	let count = 0

	for (const num of nums) {
		if (count === 0) x = num
		if (x === num) count++
		else count--
	}
	return x
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
	let val = null
	const dfs = node => {
		if (!node) return
		if (!k) return
		dfs(node.right)
		k--
		if (!k) val = node.val
		dfs(node.left)
	}
	dfs(root)
	return val
}
