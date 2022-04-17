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

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 * @see https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 */
var movingCount = function (m, n, k) {
	const set = new Set()
	const sum = num => {
		let s = 0
		while (num) {
			s += num % 10
			num = Math.floor(num / 10)
		}
		return s
	}

	const dfs = (i, j) => {
		let s = sum(i) + sum(j)
		if (s > k || i >= m || j >= n || set.has(`${i},${j}`)) return 0
		set.add(`${i},${j}`)
		return dfs(i + 1, j) + dfs(i, j + 1) + 1
	}

	return dfs(0, 0)
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
	let left = 0
	let right = nums.length - 1
	while (left < right) {
		while (left < right && nums[left] & 1) left++
		while (left < right && !(nums[right] & 1)) right++
		if (left < right) {
			let temp = nums[left]
			nums[left] = nums[right]
			nums[right] = temp
		}
	}

	return nums
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
	let i = 0
	let j = nums.length - 1
	while (i < j) {
		let m = i + Math.floor((j - i) / 2)
		if (nums[m] === m) i = m + 1
		else j = m - 1
	}
	return nums[i] === i ? i + 1 : i
}

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
	let stack = []
	while (pushed.length) {
		stack.push(pushed.shift())
		while (stack[stack.length - 1] === popped[0]) {
			stack.pop()
			popped.shift()
		}
	}
	return !stack.length
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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
	let fast = head
	let low = head

	while (k > 0) {
		fast = fast.next
		k--
	}
	while (fast) {
		fast = fast.next
		low = low.next
	}
	return low
}

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	let i = 0
	let j = 1

	while (n > 0) {
		;[i, j] = [j, (i + j) % 1000000007]
	}

	return i
}

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function (postorder) {
	let len = postorder.length
	if (len <= 1) return true
	let root = postorder.pop()
	let index = postorder.findIndex(item => item > root)
	let middle = ~index ? index : len - 1
	let left = postorder.slice(0, middle)
	let right = postorder.slice(middle)
	if (right.find(item => item < root)) return false
	return verifyPostorder(left) && verifyPostorder(right)
}

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let max = 0
	let min = Infinity

	for (const price of prices) {
		min = Math.min(min, price)
		max = Math.max(max, price - min)
	}

	return max
}

/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
	let cur
	let prev
	let head
	const dfs = node => {
		if (!node) return
		dfs(node.left)
		prev = cur
		cur = node
		if (prev) {
			cur.left = prev
			prev.right = cur
		}
		if (!head) head = cur
		dfs(node.right)
	}
	dfs(root)
	if (cur) {
		cur.right = head
		head.left = cur
	}
	return head
}

var CQueue = function () {
	this.stackA = []
	this.stackB = []
}

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
	this.stackA.push(value)
}

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
	if (this.stackB.length) return this.stackB.pop()
	if (!this.stackA.length) return -1

	while (this.stackA.length) {
		this.stackB.push(this.stackA.pop())
	}
	return this.stackB.pop()
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	let count = 0
	for (const num of nums) {
		if (!(target ^ num)) count++
	}

	return count
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
	let m = grid.length
	let n = grid[0].length

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			grid[i][j] = grid[i][j] + Math.max(i > 0 ? grid[i - 1][j] : 0, j > 0 ? grid[i][j - 1] : 0)
		}
	}

	return grid[m - 1][n - 1]
}

/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
	let str = num.toString()
	let len = str.length
	let dp = Array(len + 1).fill(0)
	dp[0] = 1

	for (let i = 0; i < len; i++) {
		dp[i + 1] += dp[i]
		if (i > 0 && ~~str[i] && ~~str.slice(i - 1, i + 1) < 26) dp[i + 1] += dp[i - 1]
	}

	return dp[len]
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	let prev = -Infinity
	let max = 0
	for (const num of nums) {
		prev = Math.max(prev + num, num)
		max = Math.max(max, prev)
	}
	return max
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function (head) {
	if (!head || !head.next) return head
	let l = head
	let count = head.val
	let prev = head
	head = head.next
	while (head) {
		count ^= head.val
		if (!count) {
			prev.next = head.next
			prev = prev.next
			head = head.next?.next
		} else {
			prev = head
			head = head.next
		}
	}

	return l
}

/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
	let last = m + n - 1
	let i = m - 1
	let j = n - 1
	while (last >= 0) {
		switch (true) {
			case i < 0:
				A[last--] = B[j--]
				break
			case j < 0:
				A[last--] = A[i--]
				break
			case A[i] <= B[j]:
				A[last--] = B[j--]
				break
			default:
				A[last--] = A[i--]
		}
	}
}

/**
 * @param {number[]} array1
 * @param {number[]} array2
 * @return {number[]}
 */
var findSwapValues = function (array1, array2) {
	let sum1 = array1.reduce((prev, v) => prev + v)
	let sum2 = array2.reduce((prev, v) => prev + v)
	let diff = sum1 - sum2
	if (diff & 1) return []
	diff /= 2
	let set = new Set(array2)
	for (const num of array1) {
		if (set.has(num - diff)) return [num, num - diff]
	}
	return []
}

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
	let m = matrix.length
	if (!m) return
	let n = matrix[0].length

	let arrM = Array(m).fill(false)
	let arrN = Array(n).fill(false)

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (!matrix[i][j]) {
				arrM[i] = true
				arrN[j] = true
			}
		}
	}

	for (let i = 0; i < m; i++) {
		if (arrM[i]) for (let j = 0; j < n; j++) matrix[i][j] = 0
	}
	for (let i = 0; i < n; i++) {
		if (arrN[i]) for (let j = 0; j < m; j++) matrix[j][i] = 0
	}
}

/**
 * @param {number[][]} land
 * @return {number[]}
 */
var pondSizes = function (land) {
	let m = land.length
	let n = land[0].length
	let res = []

	const dfs = (i, j) => {
		if (land[i][j] !== 0 || i < 0 || j < 0 || i >= m || j >= n) return 0
		land[i][j] = -1
		return (
			dfs(i + 1, j) +
			dfs(i - 1, j) +
			dfs(i, j + 1) +
			dfs(i, j - 1) +
			dfs(i + 1, j + 1) +
			dfs(i + 1, j - 1) +
			dfs(i - 1, j + 1) +
			dfs(i - 1, j - 1) +
			1
		)
	}

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (land[i][j] === 0) res.push(dfs(i, j))
		}
	}

	return res.sort((a, b) => a - b)
}

/**
 * @param {string[]} array
 * @return {string[]}
 */
var findLongestSubarray = function (array) {
	let map = new Map()
	map.set(0, -1)
	let len = array.length
	let res = []
	let sum = 0
	let left = 0
	let right = 0

	for (let i = 0; i < len; i++) {
		if (/\d/.test(array[i])) sum++
		else sum--
		if (map.has(sum)) {
			if (right - left < i - map.get(sum)) {
				left = map.get(sum)
				right = i
			}
		} else map.set(sum, i)
	}

	return array.slice(left + 1, right + 1)
}

/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function (n, graph, start, target) {
	let map = new Map()
	for (const [k, v] of graph) {
		if (map.has(k)) {
			if (!map.get(k).has(v)) map.get(k).add(v)
		} else map.set(k, new Set([v]))
	}
	const dfs = k => {
		let set = map.get(k)
		map.set(k, null)
		if (!set) return false
		let flag = false
		for (const num of set) {
			if (num === target) return true
			flag ||= dfs(num)
		}
		return flag
	}
	return dfs(start)
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
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
 */
var waysToChange = function (n) {
	let dp = Array(n + 1).fill(1)
	let arr = [5, 10, 25]

	for (const num of arr) {
		for (let i = num; i <= n; i++) {
			dp[i] = (dp[i] + dp[i - num] ?? 0) % 1000000007
		}
	}

	return dp[n]
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
	let q = 0
	let n = null
	const dfs = node => {
		if (!node) return
		if (q === 1) return
		dfs(node.left)
		if (q === -1) {
			n = node
			q = 1
			return
		}
		if (node === p) q = -1
		dfs(node.right)
	}
	dfs(root)
	return n
}

/**
 * @param {string} num
 * @param {string[]} words
 * @return {string[]}
 */
var getValidT9Words = function (num, words) {
	let arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
	let res = []
	let len = num.length

	for (const word of words) {
		if (word.length !== len) continue
		let flag = true
		for (let i = 0; i < len; i++) {
			if (!arr[num[i]].includes(word[i])) {
				flag = false
				break
			}
		}
		flag && res.push(word)
	}

	return res
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
	let map = new Map()

	for (const str of strs) {
		let arr = Array.from(str)
		arr.sort()
		let key = arr.join('')
		if (map.has(key)) map.get(key).push(str)
		else map.set(key, [str])
	}

	return Array.from(map.values())
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
	const dfs = node => {
		if (!node) return null
		let l = dfs(node.left)
		let r = dfs(node.right)
		if (l && r) return node
		if (node === q || node === p) return node
		return l || r
	}
	return dfs(root)
}
