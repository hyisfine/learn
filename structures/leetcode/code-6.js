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
