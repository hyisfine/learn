/**
 * @param {number[][]} grid
 * @return {number}
 * @see https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/
 */
var maxValue = function (grid) {
	let m = grid.length
	let n = grid[0].length

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (!j || !j) continue
			grid[i][j] = grid[i][j] + Math.max(i - 1 >= 0 ? grid[i - 1][j] : 0, j - 1 >= 0 ? grid[i][j - 1] : 0)
		}
	}
	return grid[m - 1][n - 1]
}

/**
 * @param {number} num
 * @return {number}
 * @see https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
 */
var translateNum = function (num) {
	let prev1 = 0
	let prev2 = 0
	let cur = 1
	let str = num + ''
	for (let i = 0; i < str.length; i++) {
		prev2 = prev1
		prev1 = cur
		cur = prev1
		if (i === 0) continue
		if (10 <= ~~str.substring(i - 1, i + 1) && ~~str.substring(i - 1, i + 1) <= 25) {
			cur += prev2
		}
	}
	return cur
}

/**
 * @param {number[]} nums
 * @return {number}
 * @see https://leetcode-cn.com/problems/contiguous-sequence-lcci/
 */
var maxSubArray = function (nums) {
	let prev = 0
	let max = nums[0]
	for (let num of nums) {
		prev = Math.max(prev + num, num)
		max = Math.max(max, prev)
	}
	return max
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/remove-duplicate-node-lcci/
 */
var removeDuplicateNodes = function (head) {
	let s = new Set()
	let l = head
	let prev = null
	while (head) {
		if (s.has(head.val)) {
			prev.next = head.next
		} else {
			s.add(head.val)
			prev = head
		}
		head = head.next
	}
	return l
}

/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 * @see https://leetcode-cn.com/problems/sorted-merge-lcci/
 */
var merge = function (A, m, B, n) {
	let i = m - 1
	let j = n - 1
	let k = m + n - 1
	while (i >= 0 || j >= 0) {
		let cur
		switch (true) {
			case i < 0:
				cur = B[j--]
				break
			case j < 0:
				cur = A[i--]
				break
			case A[i] >= B[j]:
				cur = A[i--]
				break
			case A[i] < B[j]:
				cur = B[j--]
				break
		}
		A[k--] = cur
	}
}
