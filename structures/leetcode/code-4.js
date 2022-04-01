function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

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
// @ts-ignore
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
// @ts-ignore
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
	// @ts-ignore
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
// @ts-ignore
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

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
	let map = new Map()
	map.set(0, 1)
	let count = 0
	for (let i = 0; i < nums.length; i++) {
		nums[i] = (nums[i - 1] || 0) + nums[i]
		if (map.has(nums[i] - k)) count += map.get(nums[i] - k)
		map.set(nums[i], (map.get(nums[i]) || 0) + 1)
	}
	return count
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
	let l1 = headA
	let l2 = headB
	while (true) {
		if (l1 && l1 === l2) return l1
		l1 = l1?.next
		l2 = l2?.next
		if (!l1 && !l2) return null
		if (!l1) l1 = headB
		if (!l2) l2 = headA
	}
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	let len = nums.length
	if (!len) return 0
	if (len === 1) return nums[0]
	let dp = Array(nums.length).fill(0)
	dp[0] = nums[0]
	dp[1] = Math.max(nums[0], nums[1])
	for (let i = 2; i < len - 1; i++) dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
	let result1 = dp[len - 2]
	dp[1] = nums[1]
	dp[2] = Math.max(nums[1], nums[2])
	for (let i = 3; i < len; i++) dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
	let result2 = dp[len - 1]
	return Math.max(result1, result2)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
	let arr1 = []
	let arr2 = []
	while (l1) {
		arr1.unshift(l1.val)
		l1 = l1.next
	}
	while (l2) {
		arr2.unshift(l2.val)
		l2 = l2.next
	}
	let arr = []
	let ans = 0
	while (arr1.length || arr2.length) {
		let val = (arr1.shift() || 0) + (arr2.shift() || 0) + ans
		ans = Math.floor(val / 10)
		val %= 10
		arr.unshift(val)
	}
	if (ans) arr.unshift(arr)
	let l = new ListNode()
	let head = l
	for (const val of arr) {
		l.next = new ListNode(val)
		l = l.next
	}
	return head.next
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
	if (!head || !head.next) return head
	let slow = head
	let fast = head.next
	while (fast && fast.next) {
		slow = slow.next
		fast = fast.next.next
	}
	let next = slow.next
	slow.next = null

	next = sortList(next)
	head = sortList(head)

	let l = new ListNode()
	let h = l

	while (head && next) {
		if (head.val <= next.val) {
			l.next = head
			head = head.next
		} else {
			l.next = next
			next = next.next
		}
		l = l.next
	}

	l.next = head || next
	return h.next
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
	if (!head) return head
	let slow = head
	let fast = head

	while (slow && fast) {
		slow = slow.next
		fast = fast.next?.next
		if (slow && slow === fast) {
			while (head !== slow) {
				slow = slow.next
				head = head.next
			}
			return head
		}
	}
	return null
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
	let m = grid.length
	let n = grid[0].length

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (!i && j) grid[i][j] += grid[i][j - 1]
			if (i && !j) grid[i][j] += grid[i - 1][j]
			if (i && j) grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j]
		}
	}

	return grid[m - 1][n - 1]
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
	let len = nums.length
	if (!len) return 0
	let map = new Map()
	map.set(0, -1)
	let count = 0
	let max = 0
	for (let i = 0; i < len; i++) {
		if (nums[i]) count += 1
		else count -= 1
		if (map.has(count)) max = Math.max(max, i - map.get(count))
		else map.set(count, i)
	}
	return max
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
	let sum = 0
	let arr = []
	const dfs = node => {
		if (!node) return
		arr.unshift(node.val)
		dfs(node.left)
		dfs(node.right)
		if (!node.left && !node.right) sum += arr.reduce((prev, item, index) => prev + item * 10 ** index, 0)
		arr.shift()
	}
	dfs(root)
	return sum
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
	let map = {}
	for (const num of nums) map[num] = (map[num] || 0) + 1

	const change = (arr, i, j) => {
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}

	class Heap {
		constructor(k, map) {
			this.k = k
			this.arr = Object.entries(map)
			this.build()
		}

		build() {
			let last = this.arr.length - 1
			let lastP = last % 2 ? (last - 1) / 2 : (last - 2) / 2

			for (let i = lastP; i >= 0; i--) {
				let j = i
				while (j <= last) {
					let p = this.arr[j]
					let left = this.arr[j * 2 + 1]
					let right = this.arr[j * 2 + 2]

					if ((!right || left[1] >= right[1]) && left[1] > p[1]) {
						change(this.arr, j, j * 2 + 1)
						j = j * 2 + 1
						continue
					}

					if (left[1] < right[1] && right[1] > p[1]) {
						change(this.arr, j, j * 2 + 2)
						j = j * 2 + 2

						continue
					}
					break
				}
			}
		}

		delete() {
			let result = []
			while (this.arr.length || result.length === this.k) {
				let top = this.arr[0]
				let bottom = this.arr.pop()
				result.push(+top[0])
				if (!this.arr.length) break
				this.arr[0] = bottom

				let last = this.arr.length - 1
				let lastP = last % 2 ? (last - 1) / 2 : (last - 2) / 2
				let j = 0
				while (j <= lastP) {
					let p = this.arr[j]
					let left = this.arr[j * 2 + 1]
					let right = this.arr[j * 2 + 2]

					if ((!right || left[1] >= right[1]) && left[1] > p[1]) {
						change(this.arr, j, j * 2 + 1)
						j = j * 2 + 1
						continue
					}

					if (left[1] < right[1] && right[1] > p[1]) {
						change(this.arr, j, j * 2 + 2)
						j = j * 2 + 2
						continue
					}
					break
				}
			}
			return result
		}
	}

	let h = new Heap(k, map)
	return h.delete()
}

// var topKFrequent = function (nums, k) {
// 	const map = new Map()
// 	for (const n of nums) map.set(n, 1 + (map.get(n) || 0))

// 	const arr = []
// 	for (const kv of map) arr.push(kv)
// 	return arr
// 		.sort((a, b) => b[1] - a[1])
// 		.slice(0, k)
// 		.map(a => a[0])
// }

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
	let dead = new Set(deadends)
	if (target === '0000') return 0
	if (dead.has(target)) return -1
	if (dead.has('0000')) return -1

	const nextStr = (str, i) => {
		let char = str[i]
		let char1 = +str[i] + 1
		let char2 = +str[i] - 1
		if (char === '9') char1 = 0
		if (char === '0') char2 = 9
		return [str.substr(0, i) + char1 + str.substr(i + 1), str.substr(0, i) + char2 + str.substr(i + 1)]
	}

	let queue = []
	let created = new Set()
	queue.push('0000')
	created.add('0000')

	let step = 0
	while (queue.length) {
		let len = queue.length
		let i = 0
		step++
		while (i < len) {
			let current = queue.shift()
			let j = 0
			while (j < 4) {
				let [str1, str2] = nextStr(current, j)
				if ([str1, str2].includes(target)) return step
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

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
	if (!root) return root
	let left = invertTree(root.left)
	let right = invertTree(root.right)
	root.left = right
	root.right = left
	return root
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
	let res = []
	let arr = []
	let dfs = start => {
		if (arr.length === k) return res.push([...arr])
		for (let i = start + 1; i <= n; i++) {
			arr.push(i)
			dfs(i)
			arr.pop()
		}
	}
	dfs(0)
	return res
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
	if (!head) return head

	let fast = head
	let slow = head

	while (n && fast) {
		fast = fast.next
		n--
	}
	let prev = slow
	while (fast) {
		prev = slow
		fast = fast.next
		slow = slow.next
	}

	if (!prev || prev === slow) return slow.next
	prev.next = slow?.next
	if (slow) slow.next = null
	return head
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
	const map = {}
	for (const char of p) map[char] = (map[char] || 0) + 1

	let prev = 0
	const result = []
	let win = {}
	let valid = 0
	let len = Object.keys(map).length

	for (let i = 0; i < s.length; i++) {
		const key = s[i]
		if (!(key in map)) {
			win = {}
			valid = 0
			prev = i + 1
			continue
		}

		win[key] = (win[key] || 0) + 1
		if (win[key] < map[key]) continue
		if (win[key] === map[key]) valid++
		if (win[key] > map[key]) {
			while (win[key] !== map[key]) {
				let key = s[prev]
				win[key]--
				if (win[key] === map[key] - 1) valid--
				prev++
			}
		}
		if (valid < len) continue
		result.push(prev)
		win[s[prev]]--
		valid--
		prev++
	}

	return result
}

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
	let stack = []
	let res = []
	let index = asteroids.findIndex(num => num > 0)
	if (~index) res = asteroids.slice(0, index)

	for (let i = index; i < asteroids.length; i++) {
		let num = asteroids[i]
		if (num > 0) {
			stack.push(num)
			continue
		}

		let len = stack.length
		if (!len) {
			res.push(num)
			continue
		}

		while (true) {
			let last = stack[stack.length - 1]
			if (last > -num) break
			if (last === -num) {
				stack.pop()
				break
			}
			if (last < -num) {
				stack.pop()
				if (!stack.length) {
					res.push(num)
					break
				}
			}
		}
	}

	return res
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	if (!s) return true

	let left = 0
	let right = s.length - 1

	while (left < right) {
		while (left < right) {
			if (/[\w^_]/.test(s[left])) break
			else left++
		}
		while (left < right) {
			if (/[0-9a-zA-Z]/.test(s[right])) break
			else right--
		}
		if (!s[left] && !s[right]) return true
		if (s[left].toLowerCase() !== s[right].toLowerCase()) return false
		right--
		left++
	}
	return true
}

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
	let len1 = s1.length
	let len2 = s2.length
	let len3 = s3.length
	if (len1 + len2 !== len3) return false
	const dp = Array(len2 + 1).fill(false)
	dp[0] = true

	for (let i = 0; i <= len1; i++) {
		for (let j = 0; j <= len2; j++) {
			const p = i + j - 1
			if (i > 0) {
				dp[j] = dp[j] && s1[i - 1] == s3[p]
			}
			if (j > 0) {
				dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] == s3[p])
			}
		}
	}

	return dp[len2]
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
	let low = 0
	let high = nums.length - 1
	while (low < high) {
		let middle = low + Math.floor((high - low) / 2)
		if (middle % 2) {
			if (nums[middle] === nums[middle - 1]) low = middle + 1
			else high = middle - 1
		} else {
			if (nums[middle] === nums[middle - 1]) high = middle - 1
			else low = middle + 1
		}
	}

	return nums[low]
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
	if (!head || !head.next) return
	let slow = head
	let fast = head
	let prev
	while (fast && fast.next) {
		prev = slow
		slow = slow.next
		fast = fast.next.next
	}
	prev.next = null

	prev = slow
	slow = slow.next
	let next = slow?.next
	while (slow) {
		slow.next = prev
		prev = slow
		slow = next
		next = next?.next
	}

	let l = new ListNode()
	let list = l
	let flag = true

	while (prev && head) {
		if (flag) {
			l.next = head
			head = head.next
		} else {
			l.next = prev
			prev = prev.next
		}
		l = l.next
		flag = !fast
	}
	l.next = prev || head
	return list.next
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
	const change = (arr, i, j) => {
		const temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
	const sort = (low, high) => {
		if (low >= high) return
		let i = low
		let j = high
		let x = nums[low]

		while (i < j) {
			while (i < j && nums[j] < x) j--
			while (i < j && nums[i] >= x) i++
			if (i < j) change(nums, i, j)
		}
		change(nums, i, low)

		if (i >= k) sort(low, i - 1)
		else sort(i + 1, high)
	}
	sort(0, nums.length - 1)
	console.log(nums)
	return nums[k - 1]
}
// @ts-ignore
var findKthLargest = function (nums, k) {
	const change = (arr, i, j) => {
		let temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
	class MaxHeap {
		constructor(nums, k) {
			this.arr = nums
			this.k = k
			this.num = null
			this.build()
			this.find()
		}

		build() {
			const len = this.arr.length - 1
			const lastP = len % 2 === 0 ? (len - 2) / 2 : (len - 1) / 2
			for (let j = lastP; j >= 0; j--) {
				let i = j
				while (i <= len) {
					const p = this.arr[i]
					const l = this.arr[i * 2 + 1]
					const r = this.arr[i * 2 + 2]

					if ((r === undefined || l >= r) && l > p) {
						change(this.arr, i, i * 2 + 1)
						i = i * 2 + 1
						continue
					}
					if (r > l && r > p) {
						change(this.arr, i, i * 2 + 2)
						i = i * 2 + 2
						continue
					}

					break
				}
			}
		}
		find() {
			while (this.k !== 1) {
				this.arr[0] = this.arr.pop()
				let i = 0
				while (i <= this.arr.length - 1) {
					const p = this.arr[i]
					const l = this.arr[i * 2 + 1]
					const r = this.arr[i * 2 + 2]
					if ((r === undefined || l >= r) && l > p) {
						change(this.arr, i, i * 2 + 1)
						i = i * 2 + 1
						continue
					}
					if (r > l && r > p) {
						change(this.arr, i, i * 2 + 2)
						i = i * 2 + 2
						continue
					}
					break
				}

				this.k--
			}
			this.num = this.arr[0]
		}
	}
	let h = new MaxHeap(nums, k)
	return h.num
}
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
	let len = s.length
	let res = []
	let arr = []
	const dfs = j => {
		if (arr.length === 4 && j === len) return res.push(arr.join('.'))
		if (arr.length === 4 && j < len) return
		let str = ''
		for (let i = j; i < len; i++) {
			str += s[i]
			if (str === '0') {
				arr.push(str)
				dfs(i + 1)
				arr.pop()
				break
			}
			if (+str > 255) break
			arr.push(str)
			dfs(i + 1)
			arr.pop()
		}
	}
	dfs(0)
	return res
}

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
	let stack = []
	let max = 0
	heights.push(0)
	heights.unshift(0)
	for (let i = 0; i < heights.length; i++) {
		while (heights[i] < heights[stack[stack.length - 1]]) {
			let index = stack.pop()
			max = Math.max(max, heights[index] * (i - stack[stack.length - 1] - 1))
		}
		stack.push(i)
	}
	return max
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
	let sum = nums.reduce((a, b) => a + b)
	let newTarget = sum - target
	let count = 0

	let map = new Map()
	let newSum = 0
	for (const num of nums) {
		newSum += num
		map.set(newSum, (map.get(newSum) || 0) + 1)
		if (map.has(newTarget - newSum)) count += map.get(newTarget - newSum)
	}

	return count
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
	let res = []
	let arr = []
	const dfs = j => {
		res.push([...arr])
		for (let i = j; i < nums.length; i++) {
			arr.push(nums[i])
			dfs(i + 1)
			arr.pop()
		}
	}
	dfs(0)
	return res
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
	let arr1 = [0]
	let arr2 = [0]
	for (let i = nums.length - 2; i >= 1; i--) {
		arr1.unshift(arr1[0] + nums[i + 1])
		arr2.unshift(arr1[0] - nums[i + 1])
	}

	let count = 0
	const dfs = (sum, i) => {
		if (i === nums.length) return count++
		if (sum + target <= arr1[i]) dfs(sum + nums[i])
		if (sum - target <= arr2[i]) dfs(sum - nums[i])
	}
	dfs(0, 0)

	return count
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
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

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
	let m = mat.length
	let n = mat[0].length

	const arr = Array(m)
		.fill(0)
		.map(() => Array(n).fill(Infinity))

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (!mat[i][j]) arr[i][j] = 0
			else {
				if (i - 1 >= 0) arr[i][j] = Math.min(arr[i][j], arr[i - 1][j] + 1)
				if (j - 1 >= 0) arr[i][j] = Math.min(arr[i][j], arr[i][j - 1] + 1)
			}
		}
	}
	for (let i = m - 1; i >= 0; i--) {
		for (let j = n - 1; j >= 0; j--) {
			if (!mat[i][j]) arr[i][j] = 0
			else {
				if (i + 1 < m) arr[i][j] = Math.min(arr[i][j], arr[i + 1][j] + 1)
				if (j + 1 < n) arr[i][j] = Math.min(arr[i][j], arr[i][j + 1] + 1)
			}
		}
	}

	return arr
}

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
 */
var flatten = function (head) {
	const dfs = node => {
		let cur = node
		let next = null
		let last = null
		while (cur) {
			next = cur.next
			if (cur.child) {
				const childLast = dfs(cur.child)
				cur.next = cur.child
				cur.child.prev = cur
				cur.child = null
				last = childLast
				if (next) {
					childLast.next = next
					next.prev = childLast
				}
			} else last = cur
			cur = next
		}
		return last
	}
	dfs(head)

	return head
}

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
	let len = nums.length

	let left = 0
	let count = 0
	let min = Infinity

	for (let i = 0; i < len; i++) {
		count += nums[i]
		while (count > target) {
			count -= target[left++]
			min = Math.min(min, i - left + 1)
		}
	}

	return min === Infinity ? 0 : min
}

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
	let arr = []

	for (let i = 1; i < triangle.length; i++) {
		let len = triangle[i].length
		for (let j = len - 1; j >= 0; j--) {
			arr[i] = triangle[i][j] + Math.min(arr[j - 1] ?? Infinity, arr[j] ?? Infinity)
		}
	}
	return Math.min(...arr)
}

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
	let len = s.length

	let dp = Array(len)
		.fill(0)
		.map(() => Array(len).fill(true))

	for (let i = len - 1; i >= 0; i--) {
		for (let j = i + 1; j < len; j++) {
			dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1]
		}
	}

	let res = []
	let ans = []

	const dfs = i => {
		if (i === len) return res.push([...ans])
		for (let j = i; j < len; j++) {
			if (dp[i][j]) {
				ans.push(s.slice(i, j + 1))
				dfs(j + 1)
				ans.pop()
			}
		}
	}
	dfs(0)

	return res
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
	let map = new Map()
	map.set(0, 1)
	let count = 0
	let sum = 0
	const dfs = node => {
		if (!node) return node
		sum += node.val
		count += map.get(sum - targetSum) || 0
		map.set(sum, (map.get(sum) || 0) + 1)
		dfs(node.left)
		dfs(node.right)
		map.set(sum, map.get(sum) - 1)
		sum -= node.val
	}
	dfs(root)
	return count
}

class KthLargest {
	constructor(k, nums) {
		this.k = k
		this.arr = []
		for (const num of nums) {
			this.add(num)
		}
	}

	change(i, j) {
		let temp = this.arr[i]
		this.arr[i] = this.arr[j]
		this.arr[j] = temp
	}

	add(num) {
		this.arr.push(num)
		let i = this.arr.length - 1
		while (i >= 0) {
			let p = i % 2 ? (i - 1) / 2 : (i - 2) / 2
			if (this.arr[p] > this.arr[i]) {
				this.change(p, i)
				i = p
			} else break
		}

		if (this.arr.length > this.k) this.delete()
		return this.arr[0]
	}

	delete() {
		let top = this.arr[0]
		let bottom = this.arr.pop()
		if (!this.arr.length) return top
		this.arr[0] = bottom
		let i = 0
		while (i < this.arr.length) {
			let left = this.arr[i * 2 + 1]
			let right = this.arr[i * 2 + 2]

			if ((right === undefined || left <= right) && left < this.arr[i]) {
				this.change(i, i * 2 + 1)
				i = i * 2 + 1
				continue
			}
			if (left > right && right < this.arr[i]) {
				this.change(i, i * 2 + 2)
				i = i * 2 + 2
				continue
			}
			break
		}

		return top
	}
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
	let sum = 0
	const dfs = node => {
		if (!node) return 0
		dfs(node.right)
		let val = node.val
		node.val += sum
		sum += val
		dfs(node.left)
	}
	dfs(root)
	return root
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
	// let queue = [root]
	// while (queue.length) {
	// 	let arr = []
	// 	for (const node of queue) {
	// 		if (node.left) arr.push(node.left)
	// 		if (node.right) arr.push(node.right)
	// 	}
	// 	if (!arr.length) return queue[0].val
	// 	queue = arr
	// }

	let val
	let max = -1
	const dfs = (node, level) => {
		if (!node) return
		if (!node.left && !node.right) {
			if (level > max) {
				max = level
				val = node.val
			}
			return
		}
		dfs(node.left, level + 1)
		dfs(node.right, level + 1)
	}
	dfs(root, 0)
	return val
}

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
	let stack = []
	let res = []
	temperatures.push(0)
	for (let i = 0; i < temperatures.length; i++) {
		let temp = temperatures[i]
		while (temperatures[stack[stack.length - 1]] < temp) {
			res.push(i - stack.pop())
		}
		stack.push(i)
	}
	return res
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
	let res = []
	const dfs = (node, k) => {
		if (!node) return
		res[k] = Math.max(res[k] ?? -Infinity, node.val)
		dfs(node.left, k + 1)
		dfs(node.right, k + 1)
	}
	dfs(root, 0)
	return res
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
	if (!k || k === 1) return 0
	let left = 0
	let sum = 1
	let count = 0
	for (let i = 0; i < nums.length; i++) {
		sum *= nums[i]
		while (sum >= k) {
			sum /= nums[left]
			left++
		}
		count += i - left + 1
	}
	return count
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let str = ''
	let max = 0

	for (let i = 0; i < s.length; i++) {
		let char = s[i]
		if (str.includes(char)) {
			let index = str.indexOf(char)
			str = str.slice(index + 1)
		}
		str += char
		max = Math.max(max, str.length)
	}

	return max
}
