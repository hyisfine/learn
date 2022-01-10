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

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function (nums) {
	for (let i = 0; i < nums.length; i++) if (nums[i] === i) return i
	return -1
}

/**
 * @param {number[]} array1
 * @param {number[]} array2
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/sum-swap-lcci/
 */
var findSwapValues = function (array1, array2) {
	const sum1 = array1.reduce((a, b) => a + b, 0)
	const sum2 = array2.reduce((a, b) => a + b, 0)

	let diff = sum1 - sum2
	if (diff & 1) return []
	diff >>= 1
	let set = new Set(array1)
	for (const num of array2) {
		if (set.has(num - diff)) return [num, num - diff]
	}

	return []
}

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * @see https://leetcode-cn.com/problems/zero-matrix-lcci/
 */
var setZeroes = function (matrix) {
	let m = matrix.length
	if (!m) return
	let n = matrix[0].length

	let is = new Set()
	let js = new Set()
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (!matrix[i][j]) {
				is.add(i)
				js.add(j)
			}
		}
	}

	for (const i of is) {
		let k = 0
		while (k < n) {
			matrix[i][k++] = 0
		}
	}
	for (const j of js) {
		let k = 0
		while (k < m) {
			matrix[k++][j] = 0
		}
	}
}

/**
 * @param {number[][]} land
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/pond-sizes-lcci/
 */
var pondSizes = function (land) {
	const m = land.length
	const n = land[0].length
	const dfs = (i, j) => {
		if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || land[i][j]) return 0
		land[i][j] = 1
		return (
			1 +
			dfs(i + 1, j) +
			dfs(i - 1, j) +
			dfs(i, j + 1) +
			dfs(i, j - 1) +
			dfs(i + 1, j + 1) +
			dfs(i + 1, j - 1) +
			dfs(i - 1, j + 1) +
			dfs(i - 1, j - 1)
		)
	}

	const res = []
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (land[i][j]) continue
			res.push(dfs(i, j))
		}
	}

	return res.sort()
}

/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 * @see https://leetcode-cn.com/problems/smallest-difference-lcci/
 */
var smallestDifference = function (a, b) {
	const kuai = (arr, low, high) => {
		let i = low
		let j = high
		if (i > j) return
		let x = arr[low]

		while (i < j) {
			while (i < j && arr[j] > x) j++
			while (i < j && arr[i] <= x) i++
			if (i < j) {
				let temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}
		arr[low] = arr[i]
		arr[i] = x

		kuai(arr, low, i - 1)
		kuai(arr, i + 1, high)
	}

	kuai(a, 0, a.length - 1)
	kuai(b, 0, b.length - 1)
	let i = 0
	let j = 0
	let min = Infinity
	while (i < a.length && j < b.length) {
		min = Math.min(min, Math.abs(a[i] - b[j]))
		if (a[i] > b[j]) j++
		else if (a[i] < b[j]) i++
		if (a[i] === b[j]) return 0
	}
	return min
}
