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
