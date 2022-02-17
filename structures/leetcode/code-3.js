function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val
	this.left = left === undefined ? null : left
	this.right = right === undefined ? null : right
}

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
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
