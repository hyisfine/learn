/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
	let set = new Set(nums)
	let max = 0

	for (const num of set) {
		if (!set.has(num - 1)) {
			let index = 1
			let __num = num

			while (set.has(__num + 1)) {
				index++
				__num++
			}

			max = Math.max(max, index)
		}
	}

	return max
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
	let len = nums.length
	let res = []
	let arr = []
	const dfs = () => {
		if (arr.length === len) return res.push([...arr])
		for (let i = 0; i < len; i++) {
			if (nums[i] === Infinity) continue
			let val = nums[i]
			nums[i] = Infinity
			arr.push(val)
			dfs()
			arr.pop()
			nums[i] = val
		}
	}
	dfs()

	return res
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	let res = []
	let len = nums.length
	nums.sort((a, b) => a - b)
	if (len < 3 || nums[0] > 0 || nums[len - 1] < 0) return res

	for (let i = 0; i < len; i++) {
		const num = nums[i]
		if (i > 0 && num === nums[i - 1]) continue
		if (num > 0) return res
		let left = i + 1
		let right = len - 1

		while (left < right) {
			let sum = num + nums[left] + nums[right]
			if (sum === 0) {
				res.push([num, nums[left], nums[right]])
				while (left < right && nums[left] === nums[left + 1]) left++
				while (left < right && nums[right] === nums[right - 1]) right--
				left++
				right--
				continue
			}
			if (sum < 0) left++
			if (sum > 0) right--
		}
	}

	return res
}

var findTarget = function (root, k) {
	let set = new Set()
	let flag = false
	const dfs = node => {
		if (!node) return
		if (set.has(k - node.val)) return (flag = true)
		set.add(node.val)
		dfs(node.left)
		dfs(node.right)
	}
	return flag
}

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
	let m = text1.length
	let n = text2.length
	if (!m || !n) return 0

	let dp = Array(m + 1)
		.fill(0)
		.map(() => Array(n + 1).fill(0))

	for (let i = 1; i <= m; i++) {
		let s1 = text1[i - 1]
		for (let j = 1; j <= n; j++) {
			let s2 = text2[j - 1]
			if (s1 === s2) {
				dp[i][j] = dp[i - 1][j - 1] + 1
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
			}
		}
	}

	return dp[m][n]
}

/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
	let left = 0
	let right = arr.length - 1
	let middle = 0
	while (left < right) {
		middle = left + Math.floor((right - left) / 2)
		if (arr[middle] > arr[middle + 1]) left = middle - 1
		else left = middle + 1
	}
	return middle
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function (root) {
	const dfs = node => {
		if (!node) return true
		let left = dfs(node.left)
		let right = dfs(node.right)
		if (left) node.left = null
		if (right) node.right = null
		return left && right && !node.val
	}
	if (dfs(root)) return null
	return root
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
	let set = new Set()
	let max = -1
	let min = 14
	let zero = 0
	for (const num of nums) {
		if (!num) {
			zero++
			continue
		}
		set.add(num)
		max = Math.max(max, num)
		min = Math.min(min, num)
	}

	return set.size + zero === 5 && max - min === 4
}

var getIntersectionNode = function (headA, headB) {
	if (!headA || !headB) return null
	let a = headA,
		b = headB
	while (a !== b) {
		a = a?.next || headB
		b = b?.next || headA
	}
	return a
}

/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
	let sum = 0
	let res = []
	let arr = []
	const dfs = node => {
		if (!node) return
		sum += node.val
		arr.push(node.val)
		if (!node.left && !node.right && sum === target) {
			res.push([...arr])
		}
		dfs(node.left)
		dfs(node.right)
		sum -= node.val
		arr.pop()
	}
	dfs(root)
	return res
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	let x = nums[0]
	let count = 0

	for (const num of nums) {
		if (count === 0) x = num
		if (x === num) count++
		else count--
	}
	return x
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
	let val = null
	const dfs = node => {
		if (!node) return
		if (!k) return
		dfs(node.right)
		k--
		if (!k) val = node.val
		dfs(node.left)
	}
	dfs(root)
	return val
}

var maxDepth = function (root) {
	const dfs = (node, k) => {
		if (!node) return k
		let left = dfs(node.left, k + 1)
		let right = dfs(node.right, k + 1)
		return Math.max(left, right)
	}
	return dfs(root)
}

/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
	let len = s.length
	let strs = s.split('').sort()
	let res = new Set()
	let arr = []
	const dfs = (j, str) => {
		if (arr.length === len) return res.add(arr.join(''))
		for (let i = 0; i < len; i++) {
			if (!strs[i]) continue
			if (i === j + 1 && strs[i] === str) continue
			let char = strs[i]
			strs[i] = ''
			arr.push(char)
			dfs(i, char)
			strs[i] = char
			arr.pop()
		}
	}
	dfs(0, '')
	return Array.from(res)
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
	let res = null
	const dfs = node => {
		if (!node) return false
		let left = dfs(node.left)
		let right = dfs(node.right)
		if (left && right) res = node
		if ((left || right) && (node.val === p || node.val === q)) res = node
		return node.val === p || node.val === q
	}
	dfs(root)
	return res
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
	let head = new ListNode()
	let h = head
	while (l1 && l2) {
		if (l1.val <= l2.val) {
			head.next = l1
			l1 = l1.next
		} else {
			head.next = l2
			l2 = l2.next
		}
		head = head.next
	}
	head.next = l1 || l2

	return h.next
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
	let l = new ListNode()
	l.next = head
	let prev = l
	let cur = head
	let next = cur?.next

	while (cur) {
		if (cur.val === val) {
			prev.next = next
			cur.next = null
			return l.next
		} else {
			prev = cur
			cur = next
			next = next?.next
		}
	}
	return l.next
}

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
	if (n < 0) {
		x = 1 / x
		n = -n
	}
	if (n === 0) return 1
	if (n === 1) return x
	if (n & 1) {
		let val = myPow(x, (n - 1) / 2)
		return val * val * x
	}
	let val = myPow(x, n / 2)
	return val * val
}

/**
 * @param {number} n
 * @return {number[]}
 */
var dicesProbability = function (n) {
	let res = [0, 1, 1, 1, 1, 1, 1]
	let max = 6 * n
	for (let i = 1; i < n; i++) {
		for (let j = max; j > 0; j--) {}
	}
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function (root) {
	const dfs = node => {
		if (!node) return null
		let left = dfs(node.left)
		let right = dfs(node.right)
		node.left = right
		node.right = left
		return node
	}
	return dfs(root)
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
	if (!root) return []
	let res = [[root.val]]
	let queue = [root]
	let level = 1

	while (queue.length) {
		level++
		let arr = []
		let nums = []
		for (let i = 0; i < queue.length; i++) {
			let node = queue[i]
			node.left && arr.push(node.left)
			node.right && arr.push(node.right)
			if (level & 1) nums.push(node.val)
			else nums.unshift(node.val)
		}
		queue = arr
	}

	return res
}

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
	if (!A || !B) return false

	const compare = (t1, t2) => {
		if (!t1 && !t2) return true
		if (t1 && !t2) return true
		if (!t1 && t2) return false
		if (t1.val !== t2.val) return false
		return compare(t1.left, t2.left) && compare(t1.right, t2, right)
	}
	const dfs = node => {
		if (!node) return false
		if (node.val === B.val) return compare(node, B)
		return dfs(node.left) || dfs(node.right)
	}
	return dfs(A)
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	let prev = -Infinity
	let max = -Infinity
	for (const num of nums) {
		prev = Math.max(prev + num, num)
		max = Math.max(prev, max)
	}
	return max === -Infinity ? 0 : max
}

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
	let str = word.split('')
	let len = str.length
	let len1 = board.length
	if (!len1) return false
	let len2 = board[0].length
	const compare = (i, j, k) => {
		if (i < 0 || j < 0 || i >= len1 || j >= len2) return false
		if (board[i][j] !== word[k]) return false
		if (!board[i][j]) return false
		if (k === len - 1) return true
		let char = board[i][j]
		board[i][j] = ''
		let result =
			compare(i + 1, j, k + 1) || compare(i - 1, j, k + 1) || compare(i, j + 1, k + 1) || compare(i, j - 1, k + 1)
		board[i][j] = char
		return result
	}

	for (let i = 0; i < len1; i++) {
		for (let j = 0; j < len2; j++) if (compare(i, j, 0)) return true
	}

	return false
}

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
	let dp = [1]
	let dp2 = 0
	let dp3 = 0
	let dp5 = 0

	for (let i = 1; i < n; i++) {
		let n2 = dp[dp2] * 2
		let n3 = dp[dp3] * 3
		let n5 = dp[dp5] * 5
		dp[i] = Math.min(n2, n3, n5)
		if (dp[i] === n2) dp2++
		if (dp[i] === n3) dp3++
		if (dp[i] === n5) dp5++
	}

	return dp[n - 1]
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
	if (!root) return 1
	let l = isBalanced(root.left)
	if (l === false) return false
	let r = isBalanced(root.right)
	if (r === false) return false
	if (Math.abs(l - r) > 1) return false
	return Math.max(l, r) + 1
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
	let len1 = matrix.length
	if (!len1) return false
	let len2 = matrix[0].length
}

/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
	let res = []
	let arr = []
	let sum = 0
	let index = 1
	while (index <= Math.ceil(target / 2)) {
		sum += index
		arr.push(index)
		while (sum >= target) {
			if (sum === target) res.push([...arr])
			sum -= arr.shift()
		}
		index++
	}

	return res
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let map = {}
	let left = -1
	let max = 0
	let len = s.length
	for (let i = 0; i < len; i++) {
		let str = s[i]
		if (str in map) {
			const last = map[str]
			if (last > left) {
				max = Math.max(max, i - left - 1)
				left = last
			}
		}
		map[str] = i
	}
	max = Math.max(len - left - 1, max)
	return max
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
	if (!root) return []
	let queue = [root]
	let res = []

	while (queue.length) {
		let arr = []
		let vals = []

		for (const node of queue) {
			vals.push(node.val)
			if (node.left) {
				arr.push(node.left)
			}
			if (node.right) {
				arr.push(node.right)
			}
		}

		res.push(vals)
		queue = arr
	}

	return res
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
	if (!root) return true
	const dfs = (A, B) => {
		if (!A && !B) return true
		if (A?.val !== B?.val) return false
		return dfs(A.left, B.right) && dfs(A.right, B.left)
	}
	return dfs(root.left, root.right)
}
