function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val
	this.left = left === undefined ? null : left
	this.right = right === undefined ? null : right
}

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

const change = (arr, i, j) => {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * @see https://leetcode-cn.com/problems/find-closest-lcci/
 */
var findClosest = function (words, word1, word2) {
	let w1 = []
	let w2 = []
	words.forEach((word, index) => {
		if (word === word1) w1.push(index)
		if (word === word2) w2.push(index)
	})

	let i = 0
	let j = 0
	let min = words.length

	while (i < w1.length && j < w2.length) {
		min = Math.min(min, Math.abs(w1[i] - w2[j]))
		if (w1[i] > w2[j]) j++
		else i++
	}

	return min
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/3sum/
 */
var threeSum = function (nums) {
	const arr = []
	nums = nums.sort((a, b) => a - b)
	const len = nums.length
	for (let i = 0; i < len; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) continue
		const num1 = nums[i]
		let j = i + 1
		let k = len - 1
		while (j < k) {
			if (j > i + 1 && nums[j] === nums[j - 1]) {
				j++
				continue
			}
			const res = num1 + nums[j] + nums[k]
			if (res > 0) k--
			if (res < 0) j++
			if (res === 0) {
				arr.push([num1, nums[j], nums[k]])
				k--
				j++
			}
		}
	}
	return arr
}

/**
 * @param {string} s
 * @return {number}
 * @see https://leetcode-cn.com/problems/string-to-integer-atoi/
 */
var myAtoi = function (s) {
	let sign = ''
	let res = ''
	s = s.trim()

	for (const char of s) {
		if (['-', '+'].includes(char) && !sign) {
			sign = char
			continue
		}
		if (!'0123456789'.includes(char)) break
		if (!res && char === '0') continue
		res += char
	}

	let nums = Number(res)
	if (sign === '-') return Math.max(nums * -1, -1 * 2 ** 31)
	return Math.min(nums, 2 ** 31 - 1)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/merge-k-sorted-lists/
 */
var mergeKLists = function (lists) {
	if (!lists.length) return null
	const merge = (A, B) => {
		if (!A || !B) return A || B
		let head = new ListNode()
		let l = head
		while (A && B) {
			if (A.val >= B.val) {
				head.next = A
				A = A.next
			} else {
				head.next = B
				B = B.next
			}
			head = head.next
		}
		head.next = A || B
		return l.next
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

	return lists[0]
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
 */
var kthSmallest = function (root, k) {
	if (!root) return
	let t
	const dfs = node => {
		if (!node) return
		dfs(node.left)
		k--
		if (k === 0) t = node
		else dfs(node.right)
	}
	return t?.val
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * @see https://leetcode-cn.com/problems/unique-paths/
 */
var uniquePaths = function (m, n) {
	if (!m || !n) return 0
	const dp = Array(n).fill(0)
	for (let i = 0; i < n; i++) dp[i] = 1
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) dp[j] = dp[j] + dp[j - 1]
	}
	return dp[n - 1]
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/reverse-linked-list/
 */
var reverseList = function (head) {
	let cur = head
	let prv = null
	let next = head.next

	while (cur) {
		cur.next = prv
		prv = cur
		cur = next
		next = next?.cur
	}

	return prv
}

/**
 * @param {number[][]} matrix
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/spiral-matrix/
 */
var spiralOrder = function (matrix) {
	let q = 0
	let i = 0
	let j = 0
	let arr = []
	let m = matrix.length
	let n = matrix?.[0].length
	while (arr.length !== matrix.length) {
		arr.push(matrix[i][j])

		switch (true) {
			case i === q && j < n - 1 - q:
				j++
				break
			case j === n - 1 - q && i < m - 1 - q:
				i++
				break
			case i === m - 1 - q && j > q:
				j--
				break
			case j === q && i > q + 1:
				i--
				break
			case j === q && i === q + 1:
				q++
				j++
		}
	}

	return arr
}

/**
 * @param {ListNode} head
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/linked-list-cycle/
 */
var hasCycle = function (head) {
	if (head == null || head.next == null) {
		return false
	}
	let slow = head
	let fast = head.next
	while (slow != fast) {
		if (fast == null || fast.next == null) {
			return false
		}
		slow = slow.next
		fast = fast.next.next
	}
	return true
}

/**
 * @param {number[]} height
 * @return {number}
 * @see https://leetcode-cn.com/problems/container-with-most-water/
 */
var maxArea = function (height) {
	let l = 0
	let r = height.length - 1
	let max = 0

	while (l < r) {
		max = Math.max(max, Math.min(height[l], height[r]) * (r - l))
		if (height[l] <= height[r]) l++
		else r--
	}

	return max
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @see arr
 */
var permute = function (nums) {
	const result = []

	const dfs = arr => {
		if (arr.length === nums.length) return result.push([...arr])

		for (let i = 0; i < nums.length; i++) {
			if (nums[i] === false) continue
			let v = nums[i]
			nums[i] = false
			arr.push(v)
			dfs(arr)
			arr.pop()
			nums[i] = v
		}
	}
	dfs([])

	return result
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
	const dfs = node => {
		if (!node) return
		let l = dfs(node.left)
		let r = dfs(node.right)
		if (l && r) return node
		if (node === p || node === q) return node
		return l || r
	}

	return dfs(root)
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
	if (!head) return head

	let fast = head
	let slow = head
	while (fast) {
		if (!k) {
			fast = fast.next
			slow = slow.next
		} else {
			fast = fast.next
			if (!fast) fast = head
			k--
		}
	}

	let hs = slow

	while (true) {
		if (!slow.next) slow.next = head
		slow = slow.next
		if (slow.next === hs) break
	}
	slow.next = null
	return hs
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/sort-list/
 */
var sortList = function (head) {
	/**
	 * @param {ListNode} A
	 * @param {ListNode} B
	 * @return {ListNode}
	 */
	const merge = (A, B) => {
		if (!A || !B) return A || B
		let head = new ListNode()
		let l = head
		while (A && B) {
			if (A.val <= B.val) {
				head.next = A
				A = A.next
			} else {
				head.next = B
				B = B.next
			}
			head = head.next
		}
		head.next = A || B
		return l.next
	}

	/**
	 * @param {ListNode} list
	 * @return {ListNode}
	 */
	const sort = list => {
		if (!list || !list.next) return list
		let fast = list
		let center = list
		let prev
		while (fast) {
			if (!fast.next?.nex) prev = center
			fast = fast.next?.next
			center = center.next
		}
		prev.next = null
		return merge(sort(list), sort(center))
	}

	return sort(head)
}

/**
 * @param {number[]} nums
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/product-of-array-except-self/
 */
var productExceptSelf = function (nums) {
	let len = nums.length
	if (nums.length <= 1) return nums

	let arr1 = Array(len).fill(1)
	let arr2 = Array(len).fill(1)

	for (let i = 1; i < len; i++) {
		arr1[i] = arr1[i - 1] * nums[i - 1]
	}
	for (let i = len - 2; i >= 0; i--) {
		arr2[i] = arr2[i + 1] * nums[i + 1]
	}

	return arr1.map((v, i) => v * arr2[i])
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @see https://leetcode-cn.com/problems/3sum-closest/
 */
var threeSumClosest = function (nums, target) {
	nums.sort((a, b) => a - b)

	let result
	let ans = Infinity

	for (let i = 0; i < nums.length - 2; i++) {
		let temp = nums[i]
		nums[i] = NaN
		let j = i + 1
		let k = nums.length - 1

		while (j < k) {
			if (isNaN(nums[j])) {
				j++
				continue
			}
			if (isNaN(nums[k])) {
				k--
				continue
			}
			let _result = temp + nums[j] + nums[k]
			let _ans = Math.abs(target - _result)
			if (_ans < ans) {
				ans = _ans
				result = _result
			}

			if (_result === target) return target
			if (_result < target) j++
			else k--
		}

		nums[i] = temp
	}

	return result
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/merge-two-sorted-lists/
 */
var mergeTwoLists = function (list1, list2) {
	let l = new ListNode()
	let head = l
	while (list1 && list2) {
		if (list1.val <= list2.val) {
			l.next = list1
			list1 = list1.next
		} else {
			l.next = list2
			list2 = list2.next
		}
		l = l.next
	}
	l.next = list1 || list2

	return head.next
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 */
var findKthLargest = function (nums, k) {
	class Heap {
		constructor(k) {
			this.max = k
			this.arr = []
		}

		add(val) {
			this.arr.push(val)
			let i = this.arr.length - 1
			while (i) {
				let p = i % 2 ? (i - 1) / 2 : (i - 2) / 2
				if (this.arr[p] > this.arr[i]) {
					change(this.arr, i, p)
					;[p, i] = [i, p]
				} else break
			}

			if (this.arr.length > this.max) this.delete()
		}

		delete() {
			if (!this.arr.length) return
			let bottom = this.arr.pop()
			if (!this.arr.length) return
			this.arr[0] = bottom
			let i = 0
			while (i < this.arr.length) {
				let p = this.arr[i]
				let l = this.arr[i * 2 + 1]
				let r = this.arr[i * 2 + 2]

				if ((r == undefined || r >= l) && p > l) {
					change(this.arr, i, i * 2 + 1)
					i = i * 2 + 1
					continue
				}

				if (r < l && p > r) {
					change(this.arr, i, i * 2 + 2)
					i = i * 2 + 2
					continue
				}

				break
			}
		}
	}

	let h = new Heap(k)

	for (const num of nums) {
		h.add(num)
	}
	return h.arr[0]
}

/**
 * @param {number[]} prices
 * @return {number}
 * @see https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
 */
var maxProfit = function (prices) {
	let ans = 0
	let n = prices.length
	for (let i = 1; i < n; ++i) {
		ans += Math.max(0, prices[i] - prices[i - 1])
	}
	return ans
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
	if (!headA || !headB) return null
	let pa = headA
	let pb = headB

	while (pa !== pb) {
		pa = pa ? pa.next : headB
		pb = pb ? pb.next : headA
	}

	return pa
}

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 */
var removeDuplicates = function (nums) {
	let len = nums.length
	if (!len) return 0

	let fast = 1
	let slow = 1

	while (fast < len) {
		if (nums[fast] !== nums[fast - 1]) {
			nums[slow] = nums[fast]
			slow++
		}
		fast++
	}

	return slow
}

/**
 * @param {TreeNode} root
 * @return {number}
 * @see https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
 */
var maxPathSum = function (root) {
	if (!root) return 0

	let max = -Infinity
	const dfs = node => {
		if (!node) return 0
		const l = Math.max(dfs(node.left), 0)
		const r = Math.max(dfs(node.right), 0)
		let res = node.val + l + r
		max = Math.max(max, res)
		return node.val + Math.max(l, r)
	}
	dfs(root)
	return max
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/linked-list-cycle-ii/
 */
var detectCycle = function (head) {
	if (!head) return head
	let slow = head
	let fast = head

	while (fast && slow) {
		fast = fast.next?.next
		slow = slow.next

		if (fast && fast === slow) {
			fast = head
			while (slow != fast) {
				slow = slow.next
				fast = fast.next
			}

			return fast
		}
	}

	return null
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @see https://leetcode-cn.com/problems/subsets/
 */
var subsets = function (nums) {
	nums.sort((a, b) => a - b)

	const res = []
	const len = nums.length

	const dfs = arr => {
		res.push(arr)
		if (arr.length === len) return

		for (let index = 0; index < len; index++) {
			if (nums[index] <= arr[arr.length - 1]) continue
			dfs([...arr, nums[index]])
		}
	}
	dfs([])
	return res
}

/**
 * @param {string} s
 * @return {string}
 * @see https://leetcode-cn.com/problems/longest-palindromic-substring/
 */
var longestPalindrome = function (s) {
	let len = s.length
	let res = ''
	for (let i = 0; i < len; i++) {
		let left = i
		let right = i
		while (left >= 0 && right < len && s[left] === s[right]) {
			left--
			right++
		}

		if (res.length < right - 1 - left) {
			res = s.substring(left + 1, right)
		}

		left = i
		right = i + 1

		while (left >= 0 && right < len && s[left] === s[right]) {
			left--
			right++
		}

		if (res.length < right - 1 - left) {
			res = s.substring(left + 1, right)
		}
	}

	return res
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/add-two-numbers/
 */
var addTwoNumbers = function (l1, l2) {
	if (!l1 || !l2) return l1 || l2

	let l = new ListNode()
	let head = l
	while (l1 && l2) {
		let val = l1.val + l2.val + l2.val
	}
}
