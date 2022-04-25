/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
	const merge = (l1, l2) => {
		let l = new ListNode()
		let head = l
		while (l1 && l2) {
			if (l1.val <= l2) {
				l.next = l1
				l1 = l1.next
			} else {
				l.next = l2
				l2 = l2.next
			}
			l = l.next
		}
		l.next = (l1 ?? null) || (l2 ?? null)
		return head.next
	}
	while (lists.length > 1) {
		let arr = []
		if (lists.length % 2) arr.push(lists.pop())
		for (let i = 0; i < lists.length; i = i + 2) {
			const l1 = lists[i]
			const l2 = lists[i + 1]
			arr.push(merge(l1, l2))
		}
		lists = arr
	}
	return lists.pop()
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
	let num
	const dfs = node => {
		if (!node) return
		if (!k) return
		dfs(node.left)
		k--
		if (k === 0) {
			num = node.val
			return
		}
		dfs(node.right)
	}
	dfs(root)
	return num
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
	let dp = Array(n).fill(1)
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) dp[i] = dp[i] = dp[i - 1]
	}
	return dp[n - 1]
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
	let prev = null
	let cur = head
	let next = head?.next

	while (cur) {
		cur.next = prev
		prev = cur
		cur = next
		next = next?.next
	}

	return prev
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
	if (!head || !head.next) return false
	let low = head
	let fast = head.next
	while (low !== fast) {
		if (!fast || !low) return false
		low = low.next
		fast = fast.next?.next
	}

	return true
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const merge = (l1, l2) => {
	let l = new ListNode()
	let head = l
	while (l1 && l2) {
		if (l1.val <= l2.val) {
			l.next = l1
			l1 = l1.next
		} else {
			l.next = l2
			l2 = l2.next
		}
		l = l.next
	}
	l.next = l1 || l2 || null
	return head.next
}
var sortList = function (head) {
	if (!head || !head.next) return head
	let low = head
	let fast = head
	while (fast) {
		fast = fast.next?.next
		if (!fast) {
			let next = low.next
			low.next = null
			low = next
		} else {
			low = low.next
		}
	}
	let left = sortList(head)
	let right = sortList(low)
	return merge(left, right)
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
	let len = nums.length
	let arr1 = Array(len)
	arr1[0] = nums[0]
	let arr2 = Array(len)
	arr2[len - 1] = nums[len - 1]
	for (let i = 1; i < len; i++) arr1[i] = nums[i] * arr1[i - 1]
	for (let i = len - 2; i >= 0; i--) arr2[i] = nums[i] * arr2[i + 1]
	let arr = []
	for (let i = 0; i < len; i++) {
		arr[i] = (arr1[i - 1] ?? 1) * (arr2[i + 1] ?? 1)
	}
	return arr
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
	nums.sort((a, b) => a - b)
	let len = nums.length
	let __target = target
	for (let i = 0; i < len; i++) {
		let a = nums[i]
		let j = i + 1
		let k = len - 1
		while (j < k) {
			let b = nums[j]
			let c = nums[k]
			let sum = a + b + c
			let diff = Math.abs(sum - target)
			if (diff === 0) return __target
			if (sum < target) j++
			else k--
			if (Math.abs(target - __target) > Math.abs(target - sum)) __target = sum
		}
	}
	return __target
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
	let num
	const sort = (low, high) => {
		if (low > high) return
		let i = low
		let j = high
		let x = nums[i]

		while (i < j) {
			while (i < j && nums[j] > x) j--
			while (i < j && nums[i] <= x) i++
			if (i < j) {
				;[nums[i], nums[j]] = [nums[j], nums[i]]
			}
		}
		;[nums[i], nums[low]] = [nums[low], nums[i]]
		if (i === k - 1) num = nums[i]
		if (i < k) sort(i + 1, high)
		if (i > k) sort(low, i - 1)
	}
	sort(0, nums.length - 1)
	return num
}

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let sum = 0
	let len = prices.length
	for (let i = 1; i < len; i++) {
		sum += Math.max(0, prices[i] - prices[i - 1])
	}
	return sum
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	let len = nums.length
	if (!len) return 0
	let fast = 0
	let low = 0
	while (fast < low) {
		if (nums[fast] !== nums[fast - 1]) {
			nums[low] = nums[fast]
			low++
		}
		fast++
	}
	return low + 1
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	let stack = []
	let left = '[{('
	let map = {
		'[': ']',
		'{': '}',
		'(': ')',
	}
	for (const str of s) {
		if (left.includes(str)) stack.push(str)
		else {
			const pop = stack.pop()
			if (map[pop] !== str) return false
		}
	}
	return !stack.length
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
	let len = nums.length
	let left = 0
	let right = len - 1

	while (left <= right) {
		let m = left + Math.floor((right - left) / 2)
		if (nums[left] === target) return left
		if (nums[right] === target) return right
		if (nums[m] === target) return m
		if (nums[m] >= nums[0]) {
			if (target <= nums[0]) {
				left = m + 1
			} else {
				if (target <= nums[m]) {
					right = m - 1
				} else left = m + 1
			}
		} else {
			if (target >= nums[0]) {
				right = m - 1
			} else {
				if (target >= nums[m]) {
					left = m + 1
				} else right = m - 1
			}
		}
	}
	return -1
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
	nums.sort((a, b) => a - b)
	let res = []
	let arr = []
	let len = nums.length
	const dfs = () => {
		if (arr.length === len) return res.push([...arr])
		for (let i = 0; i < len; i++) {
			if (i > 0 && nums[i] === nums[i - 1]) continue
			if (nums[i] === Infinity) continue
			let num = nums[i]
			nums[i] = Infinity
			arr.push(num)
			dfs()
			arr.pop()
			nums[i] = num
		}
	}
	dfs()
	return res
}
