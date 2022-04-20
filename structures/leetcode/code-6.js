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
