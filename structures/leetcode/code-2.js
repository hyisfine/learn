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
// TODO

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

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/
 */
var kthToLast = function (head, k) {
	let left = head
	let right = head
	while (k) {
		right = right.next
		k--
	}

	while (right) {
		right = right.next
		left = left.next
	}
	return left.val
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/sorted-matrix-search-lcci/
 */
var searchMatrix = function (matrix, target) {
	let m = matrix.length
	if (!m) return false
	let n = matrix[0].length

	let i = 0
	let j = n - 1
	while (i < m && j >= 0) {
		let _target = matrix[i][j]
		if (_target === target) return true
		if (_target < target) i++
		else n--
	}
	return false
}

/**
 * @param {string[]} board
 * @return {string}
 * @see https://leetcode-cn.com/problems/tic-tac-toe-lcci/
 */
var tictactoe = function (board) {
	let n = board.length
	let hasEmpty = false

	for (let i = 0; i < n; i++) {
		let j = 1
		while (j < n) {
			if (board[i][j - 1] === ' ') {
				hasEmpty = true
				break
			}
			if (board[i][j - 1] !== board[i][j]) break
		}
		if (j === n) return board[i][j - 1]
	}

	for (let i = 0; i < n; i++) {
		let j = 1
		while (j < n) {
			if (board[j - 1][i] === ' ' || board[j - 1][i] !== board[j][i]) break
		}
		if (j === n) return board[j - 1][i]
	}

	let i = 1
	while (i < n) {
		if (board[i - 1][i - 1] === ' ' || board[i][i] !== board[i - 1][i - 1]) break
		i++
	}
	if (i === n) return board[0][0]

	i = 1
	let j = n - 2
	while (i < n) {
		if (board[i - 1][j + 1] === ' ' || board[i][j] !== board[i - 1][i + 1]) break
		i++
		j--
	}
	if (i === n) return board[0][n - 1]

	if (hasEmpty) return 'Pending'
	return 'Draw'
}

/**
 * @param {string[]} array
 * @return {string[]}
 * @see https://leetcode-cn.com/problems/find-longest-subarray-lcci/
 */
var findLongestSubarray = function (array) {
	let left = 0
	let right = 0
	let map = new Map()
	let sum = 0
	map.set(0, -1)

	for (let i = 0; i < array.length; i++) {
		;/[0-9]/.test(array[i]) ? sum-- : sum++
		if (map.has(sum)) {
			if (right - left < i - map.get(sum)) {
				;[left, right] = [map.get(sum), i]
			}
		} else {
			map.set(sum, i)
		}
	}

	return array.slice(left + 1, right + 1)
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
	if (s1.length !== s2.length) return false
	let map1 = {}
	let map2 = {}

	for (let i = 0; i < s1.length; i++) {
		map1[s1[i]] = (map1[s1[i]] || 0) + 1
		map2[s2[i]] = (map2[s2[i]] || 0) + 1
	}

	for (const char of s1) {
		if (map1[char] !== map2[char]) return false
	}
	return true
}

/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 * @see https://leetcode-cn.com/problems/route-between-nodes-lcci/
 */
var findWhetherExistsPath = function (n, graph, start, target) {
	// 创建邻接矩阵
	// 使用Set 排除多条相同连接边，即平行边
	const matrix = Array(n)
		.fill(0)
		.map(() => new Set())

	for (let [k, v] of graph) {
		// 填充邻接矩阵
		if (!matrix[k].has(v)) matrix[k].add(v)
	}

	const bfs = j => {
		const set = matrix[j]
		//	为0则无须判断
		if (set.size === 0) return false
		// 找到target返回true
		if (set.has(target)) return true

		// 在循环之前删除当前邻接set，防止陷入死循环
		const tempArr = [...set]
		set.clear()

		for (let i = 0; i < tempArr.length; i++) {
			// 跳过自环
			if (set[i] === j) continue
			if (bfs(set[i])) return true
		}
		return false
	}

	return bfs(start)
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/
 */
var getIntersectionNode = function (headA, headB) {
	let A = headA
	let B = headB

	while (A !== B) {
		if (!A) A = headB
		else A = A.next
		if (!B) B = headA
		else B = B.next
	}

	return A
}

/**
 * @param {number} n
 * @return {number}
 * @see https://leetcode-cn.com/problems/coin-lcci/
 */
var waysToChange = function (n) {
	if (!n) return 0

	const arr = Array(n + 1).fill(1)
	const coins = [5, 10, 25]
	coins.forEach(item => {
		let i = item
		while (i <= n) {
			arr[i] = (arr[i] + (arr[i - item] || 0)) % 1000000007
			i++
		}
	})

	return arr[n]
}

/**
 * @param {number[]} height
 * @param {number[]} weight
 * @return {number}
 */
var bestSeqAtIndex = function (height, weight) {
	if (!height.length) return 0
	const stack = new Array(weight.length)
	let idx = 0
	for (const num of weight) {
		let l = 0,
			r = idx
		while (l < r) {
			let mid = Math.floor((l + r) / 2)
			if (stack[mid] < num) l = mid + 1
			else r = mid
		}
		if (l == idx) stack[idx++] = num
		else stack[l] = num
	}

	return idx
}

/**
 * @param {string} big
 * @param {string[]} smalls
 * @return {number[][]}
 */
var multiSearch = function (big, smalls) {
	let max = 0
	let keys = new Set()
	console.time('1')
	for (const char of smalls) {
		max = Math.max(max, char.length)
		keys.add(char.length)
	}
	console.timeEnd('1')

	let map = new Map()
	console.time('2')
	for (let index = 0; index < big.length; index++) {
		let k = index
		while (k >= 0 && index - k <= max) {
			if (keys.has(index - k + 1)) {
				let key = big.slice(k, index + 1)
				if (map.has(key)) map.get(key).push(k)
				else map.set(key, [k])
			}
			k--
		}
	}
	console.timeEnd('2')

	let arr = []
	console.time('3')
	for (const char of smalls) {
		if (map.has(char)) arr.push(map.get(char))
		else arr.push([])
	}
	console.timeEnd('3')

	return arr
}
// multiSearch('mississippijhbvcchbgftynbverbt', ['is', 'ppi', 'hi', 'sis', 'i', 'ssippia'])
//

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
	if (!root) return 1
	let l = isBalanced(root.left)
	if (!l) return false
	let r = isBalanced(root.right)
	if (!r) return false
	if (Math.abs(r - l) > 1) return false
	return Math.abs(r - l) + 1
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 * @see https://leetcode-cn.com/problems/successor-lcci/
 */
var inorderSuccessor = function (root, p) {
	let prev = null
	let res = null

	const dfs = node => {
		if (!node || res) return
		dfs(node.left)
		if (prev === p && !res) {
			res = node
			return
		}
		prev = node
		dfs(node.right)
	}

	dfs(root)
	return res
}

/**
 * @param {string[]} names
 * @param {string[]} synonyms
 * @return {string[]}
 */
var trulyMostPopular = function (names, synonyms) {
	let map1 = new Map()
	for (const name of names) {
		let [str] = name.match(/[a-zA-Z]+/g)
		let [num] = name.match(/\d+/g)
		map1.set(str, ~~num)
	}

	let map2 = new Map()
	for (const syn of synonyms) {
		let [name1, name2] = syn.match(/[a-zA-Z]+/g)
		map2.set(name2, name1)
	}

	let arr = []
	for (const map of map2) {
		let count = 0
		let [name1] = map
		let name = name1
		if (map1.has(name1)) {
			while (map1.has(name1)) {
				count += map1.get(name1)
				map1.delete(name1)
				name1 = map2.get(name1)
				name = name > name1 ? name1 : name
			}
			arr.push(`${name}(${count})`)
		}
	}
	return arr
}

/**
 * @param {string} num
 * @param {string[]} words
 * @return {string[]}
 * @see https://leetcode-cn.com/problems/t9-lcci/
 */
var getValidT9Words = function (num, words) {
	const get = char => {
		switch (true) {
			case /[a-c]/.test(char):
				return '2'
			case /[d-f]/.test(char):
				return '3'
			case /[g-i]/.test(char):
				return '4'
			case /[j-l]/.test(char):
				return '5'
			case /[m-o]/.test(char):
				return '6'
			case /[p-s]/.test(char):
				return '7'
			case /[t-v]/.test(char):
				return '8'
			case /[w-z]/.test(char):
				return '9'
		}
	}

	let arr = []
	for (const word of words) {
		let flag = true
		for (let i = 0; i < num.length; i++) {
			const n = num[i]
			const w = word[i]
			if (n !== get(w)) {
				flag = false
				break
			}
		}

		flag && arr.push(word)
	}

	return arr
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 * @see https://leetcode-cn.com/problems/group-anagrams-lcci/
 */
var groupAnagrams = function (strs) {
	let map = new Map()
	let arr = []
	for (const str of strs) {
		let key = Array.from(str).sort().join('')
		if (map.has(key)) map.get(key).push(str)
		else map.set(key, [str])
	}

	for (const [k, v] of map) {
		arr.push(v)
	}

	return arr
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * @see https://leetcode-cn.com/problems/first-common-ancestor-lcci/
 */
var lowestCommonAncestor = function (root, p, q) {
	const dfs = node => {
		if (!node) return
		// 后序遍历
		let l = dfs(node.left)
		let r = dfs(node.right)
		// 如果左右节点都有node值，则当前node为最近祖先节点
		if (l && r) return node
		// 找到目标节点并返回
		if (node === p || node === q) return node

		if (l || r) return l || r
	}

	return dfs(root)
}

/**
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/get-kth-magic-number-lcci/
 */
var getKthMagicNumber = function (k) {
	let arr = [1]
	let p3 = 0,
		p5 = 0,
		p7 = 0

	for (let i = 1; i < k; i++) {
		let n3 = arr[p3] * 3
		let n5 = arr[p5] * 5
		let n7 = arr[p7] * 7
		arr[i] = Math.min(n3, n5, n7)
		if (n3 === arr[i]) p3++
		if (n5 === arr[i]) p5++
		if (n7 === arr[i]) p7++
	}

	return arr[k - 1]
}

/**
 * @param {number} n
 * @return {string[]}
 * @see https://leetcode-cn.com/problems/bracket-lcci/
 */
var generateParenthesis = function (n) {
	n = n * 2
	let result = []
	const bfs = (str, sum) => {
		let len = str.length
		if (sum > n - len || sum < 0) return
		if (sum === 0 && (n - len) % 2 !== 0) return
		if (len === n - 1) return result.push(str + ')')

		bfs(str + '(', sum + 1)
		bfs(str + ')', sum - 1)
	}

	bfs('(', 1)
	return result
}

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
	let map = Array(26).fill(0)

	for (const word of words2) {
		let __map = Array(26).fill(0)
		for (const char of word) {
			__map[char]++
		}
		__map.forEach((v, i) => {
			map[i] = Math.max(map[i], v)
		})
	}

	return words1.filter(word => {
		let __map = Array(26).fill(0)
		for (const char of word) {
			__map[char]++
		}
		return __map.every((v, i) => v >= map[i])
	})
}

/**
 * @param {number} n
 * @return {number}
 */
const waysToStep = n => {
	const mod = 1000000007
	if (n <= 2) return n
	let n1 = 0
	let n2 = 1
	let n3 = 2
	let v = n3
	for (let i = 3; i <= n; i++) {
		v = (n1 + n2 + n3) % mod
		n1 = n2
		n2 = n3
		n3 = v
	}
	return v
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {number}
 */
var respace = function (dictionary, sentence) {
	let dp = [0]
	let len = sentence.length
	for (let i = 1; i <= len; i++) {
		dp[i] = dp[i - 1] + 1

		for (const word of dictionary) {
			if (sentence.substring(i - word.length, i) === word) {
				dp[i] = Math.min(dp[i], dp[i - word.length])
			}
		}
	}
	return dp[len]
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 * @see https://leetcode-cn.com/problems/partition-list-lcci/
 */
var partition = function (head, x) {
	let l1 = new ListNode(0)
	const h1 = l1
	let l2 = new ListNode(0)
	const h2 = l2
	while (head !== null) {
		if (head.val < x) {
			l1.next = head
			l1 = l1.next
		} else {
			l2.next = head
			l2 = l2.next
		}
		head = head.next
	}
	l2.next = null
	l1.next = h2.next
	return h1.next
}

/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (S) {
	let strs = S.split('').sort()
	let isUsed = Array(strs.length).fill(false)
	let arr = []
	const dfs = str => {
		if (str.length === S.length) {
			arr.push(str)
			return
		}

		for (let i = 0; i < strs.length; i++) {
			if (i > 0 && S[i - 1] === S[i] && isUsed[i - 1]) continue
			if (!isUsed[i]) {
				isUsed[i] = true
				dfs(str + S[i])
				isUsed[i] = false
			}
		}
	}

	return arr
}

/**
 * @see https://leetcode-cn.com/problems/permutation-ii-lcci/
 */
var permutation = function (S) {
	S = S.split('').sort() //排序，方便确定相同字符
	let res = []
	let isTrue = new Array(S.length).fill(true)
	var dfs = function (str) {
		if (str.length == S.length) {
			res.push(str)
		}
		for (let i = 0; i < S.length; i++) {
			if (i > 0 && S[i - 1] == S[i] && !isTrue[i - 1]) continue //去重
			if (isTrue[i]) {
				isTrue[i] = false
				dfs(str + S[i])
				isTrue[i] = true
			}
		}
	}
	dfs('')
	return res
}

/**
 * @param {string[]} words
 * @return {string}
 * @see https://leetcode-cn.com/problems/longest-word-lcci/solution/gang-shua-liao-1713hou-biao-shi-1715hen-hao-gao-by/
 */
var longestWord = function (words) {
	words = words.sort((a, b) => a.length - b.length)

	const map = new Map()
	let maxWord = ''
	for (const word of words) {
		let last = 0
		for (let i = 0; i < word.length; i++) {
			let key = word.substring(last, i)
			if (map.has(key)) last = i
		}
		if (last === word.length) {
			if (maxValue.length < word.length) maxWord = word
			if (maxValue.length === word.length) maxWord = maxWord > word ? word : maxWord
		}
		map.set(word)
	}

	return maxWord
}

/**
 * @param {number} num
 * @return {number}
 */
var reverseBits = function (num) {
	let count = 0
	let zero = 0
	let last = -1
	let max = 0

	let arr = num.toString(2).split('')
	arr.forEach((item, index) => {
		console.log(1)
		if (item === '0') {
			zero++
			if (zero === 2) {
				zero = 1
				count = index - last - 1
			}
			last = index
		}
		count++
		max = Math.max(max, count)
	})

	return max
}
reverseBits(1)
