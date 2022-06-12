// /**
//  * @param {ListNode[]} lists
//  * @return {ListNode}
//  */
// var mergeKLists = function (lists) {
// 	const merge = (l1, l2) => {
// 		let l = new ListNode()
// 		let head = l
// 		while (l1 && l2) {
// 			if (l1.val <= l2) {
// 				l.next = l1
// 				l1 = l1.next
// 			} else {
// 				l.next = l2
// 				l2 = l2.next
// 			}
// 			l = l.next
// 		}
// 		l.next = (l1 ?? null) || (l2 ?? null)
// 		return head.next
// 	}
// 	while (lists.length > 1) {
// 		let arr = []
// 		if (lists.length % 2) arr.push(lists.pop())
// 		for (let i = 0; i < lists.length; i = i + 2) {
// 			const l1 = lists[i]
// 			const l2 = lists[i + 1]
// 			arr.push(merge(l1, l2))
// 		}
// 		lists = arr
// 	}
// 	return lists.pop()
// }

// /**
//  * @param {TreeNode} root
//  * @param {number} k
//  * @return {number}
//  */
// var kthSmallest = function (root, k) {
// 	let num
// 	const dfs = node => {
// 		if (!node) return
// 		if (!k) return
// 		dfs(node.left)
// 		k--
// 		if (k === 0) {
// 			num = node.val
// 			return
// 		}
// 		dfs(node.right)
// 	}
// 	dfs(root)
// 	return num
// }

// /**
//  * @param {number} m
//  * @param {number} n
//  * @return {number}
//  */
// var uniquePaths = function (m, n) {
// 	let dp = Array(n).fill(1)
// 	for (let i = 1; i < m; i++) {
// 		for (let j = 1; j < n; j++) dp[i] = dp[i] = dp[i - 1]
// 	}
// 	return dp[n - 1]
// }

// /**
//  * @param {ListNode} head
//  * @return {ListNode}
//  */
// var reverseList = function (head) {
// 	let prev = null
// 	let cur = head
// 	let next = head?.next

// 	while (cur) {
// 		cur.next = prev
// 		prev = cur
// 		cur = next
// 		next = next?.next
// 	}

// 	return prev
// }

// /**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var hasCycle = function (head) {
// 	if (!head || !head.next) return false
// 	let low = head
// 	let fast = head.next
// 	while (low !== fast) {
// 		if (!fast || !low) return false
// 		low = low.next
// 		fast = fast.next?.next
// 	}

// 	return true
// }

// /**
//  * @param {ListNode} head
//  * @return {ListNode}
//  */
// const merge = (l1, l2) => {
// 	let l = new ListNode()
// 	let head = l
// 	while (l1 && l2) {
// 		if (l1.val <= l2.val) {
// 			l.next = l1
// 			l1 = l1.next
// 		} else {
// 			l.next = l2
// 			l2 = l2.next
// 		}
// 		l = l.next
// 	}
// 	l.next = l1 || l2 || null
// 	return head.next
// }
// var sortList = function (head) {
// 	if (!head || !head.next) return head
// 	let low = head
// 	let fast = head
// 	while (fast) {
// 		fast = fast.next?.next
// 		if (!fast) {
// 			let next = low.next
// 			low.next = null
// 			low = next
// 		} else {
// 			low = low.next
// 		}
// 	}
// 	let left = sortList(head)
// 	let right = sortList(low)
// 	return merge(left, right)
// }

// /**
//  * @param {number[]} nums
//  * @return {number[]}
//  */
// var productExceptSelf = function (nums) {
// 	let len = nums.length
// 	let arr1 = Array(len)
// 	arr1[0] = nums[0]
// 	let arr2 = Array(len)
// 	arr2[len - 1] = nums[len - 1]
// 	for (let i = 1; i < len; i++) arr1[i] = nums[i] * arr1[i - 1]
// 	for (let i = len - 2; i >= 0; i--) arr2[i] = nums[i] * arr2[i + 1]
// 	let arr = []
// 	for (let i = 0; i < len; i++) {
// 		arr[i] = (arr1[i - 1] ?? 1) * (arr2[i + 1] ?? 1)
// 	}
// 	return arr
// }

// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var threeSumClosest = function (nums, target) {
// 	nums.sort((a, b) => a - b)
// 	let len = nums.length
// 	let __target = target
// 	for (let i = 0; i < len; i++) {
// 		let a = nums[i]
// 		let j = i + 1
// 		let k = len - 1
// 		while (j < k) {
// 			let b = nums[j]
// 			let c = nums[k]
// 			let sum = a + b + c
// 			let diff = Math.abs(sum - target)
// 			if (diff === 0) return __target
// 			if (sum < target) j++
// 			else k--
// 			if (Math.abs(target - __target) > Math.abs(target - sum)) __target = sum
// 		}
// 	}
// 	return __target
// }

// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var findKthLargest = function (nums, k) {
// 	let num
// 	const sort = (low, high) => {
// 		if (low > high) return
// 		let i = low
// 		let j = high
// 		let x = nums[i]

// 		while (i < j) {
// 			while (i < j && nums[j] > x) j--
// 			while (i < j && nums[i] <= x) i++
// 			if (i < j) {
// 				;[nums[i], nums[j]] = [nums[j], nums[i]]
// 			}
// 		}
// 		;[nums[i], nums[low]] = [nums[low], nums[i]]
// 		if (i === k - 1) num = nums[i]
// 		if (i < k) sort(i + 1, high)
// 		if (i > k) sort(low, i - 1)
// 	}
// 	sort(0, nums.length - 1)
// 	return num
// }

// /**
//  * @param {number[]} prices
//  * @return {number}
//  */
// var maxProfit = function (prices) {
// 	let sum = 0
// 	let len = prices.length
// 	for (let i = 1; i < len; i++) {
// 		sum += Math.max(0, prices[i] - prices[i - 1])
// 	}
// 	return sum
// }

// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var removeDuplicates = function (nums) {
// 	let len = nums.length
// 	if (!len) return 0
// 	let fast = 0
// 	let low = 0
// 	while (fast < low) {
// 		if (nums[fast] !== nums[fast - 1]) {
// 			nums[low] = nums[fast]
// 			low++
// 		}
// 		fast++
// 	}
// 	return low + 1
// }

// /**
//  * @param {string} s
//  * @return {boolean}
//  */
// var isValid = function (s) {
// 	let stack = []
// 	let left = '[{('
// 	let map = {
// 		'[': ']',
// 		'{': '}',
// 		'(': ')'
// 	}
// 	for (const str of s) {
// 		if (left.includes(str)) stack.push(str)
// 		else {
// 			const pop = stack.pop()
// 			if (map[pop] !== str) return false
// 		}
// 	}
// 	return !stack.length
// }

// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */

// var search = function (nums, target) {
// 	let len = nums.length
// 	let left = 0
// 	let right = len - 1

// 	while (left <= right) {
// 		let m = left + Math.floor((right - left) / 2)
// 		if (nums[left] === target) return left
// 		if (nums[right] === target) return right
// 		if (nums[m] === target) return m
// 		if (nums[m] >= nums[0]) {
// 			if (target <= nums[0]) {
// 				left = m + 1
// 			} else {
// 				if (target <= nums[m]) {
// 					right = m - 1
// 				} else left = m + 1
// 			}
// 		} else {
// 			if (target >= nums[0]) {
// 				right = m - 1
// 			} else {
// 				if (target >= nums[m]) {
// 					left = m + 1
// 				} else right = m - 1
// 			}
// 		}
// 	}
// 	return -1
// }

// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var permuteUnique = function (nums) {
// 	nums.sort((a, b) => a - b)
// 	let res = []
// 	let arr = []
// 	let len = nums.length
// 	const dfs = () => {
// 		if (arr.length === len) return res.push([...arr])
// 		for (let i = 0; i < len; i++) {
// 			if (i > 0 && nums[i] === nums[i - 1]) continue
// 			if (nums[i] === Infinity) continue
// 			let num = nums[i]
// 			nums[i] = Infinity
// 			arr.push(num)
// 			dfs()
// 			arr.pop()
// 			nums[i] = num
// 		}
// 	}
// 	dfs()
// 	return res
// }

// /**
//  * @param {string} num1
//  * @param {string} num2
//  * @return {string}
//  */
// var multiply = function (num1, num2) {
// 	if (num1 === '0' || num2 === '0') return '0'
// 	let s1 = num1.split('').reverse()
// 	let len1 = s1.length
// 	let s2 = num2.split('').reverse()
// 	let len2 = s2.length
// 	let arr = []
// 	let maxLen = 0
// 	for (let i = 0; i < len1; i++) {
// 		let n1 = s1[i]
// 		let temp = Array(i).fill(0)
// 		let ans = 0
// 		for (let j = 0; j < len2; j++) {
// 			let n2 = s2[j]
// 			let res = +n1 * +n2 + ans
// 			ans = Math.floor(res / 10)
// 			res = res % 10
// 			temp.push(res)
// 		}
// 		if (ans) temp.push(ans)
// 		arr.push(temp)
// 		maxLen = Math.max(maxLen, temp.length)
// 	}

// 	let j = 0
// 	let res = []
// 	let ans = 0
// 	while (true) {
// 		let sum = ans
// 		arr.forEach(item => (sum += item[j] || 0))
// 		ans = Math.floor(sum / 10)
// // 		sum = sum % 10
// // 		res.push(sum)
// // 		j++
// // 		if (j === maxLen) break
// // 	}
// // 	if (ans) res.push(ans)
// // 	return res.reverse().join('')
// // }

// // /**
// //  * @param {number} n
// //  * @return {number}
// //  */
// // var climbStairs = function (n) {
// // 	let n1 = 0
// // 	let n2 = 0
// // 	let sum = 1

// // 	while (n >= 1) {
// // 		n1 = n2
// // 		n2 = sum
// // 		sum = n1 + n2
// // 		n--
// // 	}
// // 	return sum
// // }

// // /**
// //  * @param {string} s
// //  * @return {number}
// //  */
// // var countSubstrings = function (s) {
// // 	let len = s.length
// // 	let count = 0
// // 	for (let i = 0; i < 2 * len - 1; i++) {
// // 		let j = Math.floor(i / 2)
// // 		let k = j + (i % 2)
// // 		while (j >= 0 && k < len && s[k] === s[j]) {
// // 			j--
// // 			k++
// // 			count++
// // 		}
// // 	}
// // 	return count
// // }

// // /**
// //  * @param {number[]} piles
// //  * @param {number} h
// //  * @return {number}
// //  */
// // var minEatingSpeed = function (piles, h) {
// // 	let max = Math.max(...piles)
// // 	let left = 0
// // 	let right = max

// // 	const getH = (pile, middle) => Math.ceil(middle / pile)

// // 	while (left < right) {
// // 		let middle = left + Math.floor((right - left) / 2)
// // 		let __h = 0
// // 		for (const pile of piles) {
// // 			__h += getH(pile, middle)
// // 		}

// // 		if (__h >= h) {
// // 			left = middle
// // 		} else right = middle
// // 	}
// // 	return left
// // }
// // /**
// //  * @param {string[]} words
// //  * @param {string} word1
// //  * @param {string} word2
// //  * @return {number}
// //  */
// // var findClosest = function (words, word1, word2) {
// // 	let arr1 = []
// // 	let arr2 = []
// // 	let len = words.length
// // 	for (let i = 0; i < len; i++) {
// // 		let word = words[i]
// // 		if (word === word1) arr1.push(i)
// // 		if (word === word2) arr2.push(i)
// // 	}

// // 	let len1 = arr1.length
// // 	let len2 = arr2.length
// // 	let i = 0
// // 	let j = 0
// // 	let min = Infinity
// // 	while (i < len1 && j < len2) {
// // 		let diff = arr1[i] - arr2[j]
// // 		if (diff === 0) return 0
// // 		min = Math.min(min, Math.abs(diff))
// // 		if (diff < 0) i++
// // 		else j++
// // 	}

// // 	return min
// // }

// // /**
// //  * @param {string} s
// //  * @param {number} k
// //  * @return {number}
// //  */
// // var longestSubstring = function (s, k) {
// // 	if (!s.length) return 0
// // 	let map = {}
// // 	for (const char of s) {
// // 		map[char] = (map[char] ?? 0) + 1
// // 	}
// // 	let keys = Object.keys(map).filter(key => map[key] < k)
// // 	if (!keys.length) return s.length
// // 	let res = new Set(s)
// // 	keys.forEach(key => {
// // 		let temp = new Set()
// // 		res.forEach(str => {
// // 			str.split(key).forEach(ss => temp.add(ss))
// // 		})
// // 		res = temp
// // 	})

// // 	let max = 0
// // 	for (const str of res) {
// // 		max = Math.max(max, longestSubstring(str, k))
// // 	}
// // 	return max
// // }

// // /**
// //  * @param {number[]} piles
// //  * @param {number} h
// //  * @return {number}
// //  */
// // var minEatingSpeed = function (piles, h) {
// // 	let right = Math.max(...piles)
// // 	let left = 1

// // 	const sum = (m, pile) => Math.ceil(pile / m)
// // 	while (left <= right) {
// // 		let m = left + Math.floor((right - left) / 2)
// // 		let __h = 0
// // 		for (const pile of piles) {
// // 			__h += sum(m, pile)
// // 		}
// // 		if (__h > h) left = m + 1
// // 		else right = m - 1
// // 	}
// // 	return left
// // }

// // /**
// // //  * @param {character[][]} grid
// // //  * @return {number}
// // //  */
// // // var numIslands = function (grid) {
// // // 	let m = grid.length
// // // 	let n = grid[0].length
// // // 	let count = 0

// // // 	const dfs = (i, j) => {
// // // 		if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return
// // // 		grid[i][j] = '0'
// // // 		dfs(i + 1, j)
// // // 		dfs(i - 1, j)
// // // 		dfs(i, j + 1)
// // // 		dfs(i, j - 1)
// // // 	}

// // // 	for (let i = 0; i < m; i++) {
// // // 		for (let j = 0; j < n; j++) {
// // // 			if (grid[i][j] === '1') {
// // // 				count++
// // // 				dfs(i, j)
// // // 			}
// // // 		}
// // // 	}
// // // 	return count
// // // }

// // /**
// //  * @param {string} digits
// //  * @return {string[]}
// //  */
// // var letterCombinations = function (digits) {
// // 	let arr = [, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
// // 	let res = []
// // 	let temp = []
// // 	let len = digits.length
// // 	const dfs = k => {
// // 		if (k === len) {
// // 			temp.length && res.push(temp.join(''))
// // 			return
// // 		}
// // 		for (const str of arr[digits[k]]) {
// // 			temp.push(str)
// // 			dfs(k + 1)
// // 			temp.pop()
// // 		}
// // 	}
// // 	dfs(0)
// // 	return res
// // }

// // /**
// //  * @param {string[]} strs
// //  * @return {string[][]}
// //  */
// // var groupAnagrams = function (strs) {
// // 	let map = Object.create(null)
// // 	for (const str of strs) {
// // 		let arr = Array(26).fill(0)
// // 		for (const char of str) {
// // 			arr[parseInt(char, 36) - 10]++
// // 		}
// // 		map[arr.toString()] ? map[arr.toString()].push(str) : (map[arr.toString()] = [str])
// // 	}
// // 	return Object.values(map)
// // }

// // /**
// //  * @param {number[]} nums
// //  * @return {number}
// //  */
// // var rob = function (nums) {
// // 	let len = nums.length
// // 	let prev = 0
// // 	let cur = nums[0]
// // 	let temp
// // 	if (len < 1) return 0
// // 	for (const num of nums.slice(1)) {
// // 		temp = cur
// // 		cur = Math.max(cur, prev + num)
// // 		prev = temp
// // 	}
// // 	return cur
// // }

// // /**
// //  * @param {TreeNode} root
// //  * @return {number[][]}
// //  */
// // var levelOrder = function (root) {
// // 	if (!root) return []
// // 	let res = []
// // 	let queue = [root]

// // 	while (queue.length) {
// // 		res.push(queue.map(node => node.val))
// // 		let temp = []
// // 		for (const node of queue) {
// // 			if (node.left) temp.push(node.left)
// // 			if (node.right) temp.push(node.right)
// // 		}
// // 		queue = temp
// // 	}

// // 	return res
// // }

// // /**
// //  * @param {string} s
// //  * @param {string[]} wordDict
// //  * @return {boolean}
// //  */
// // var wordBreak = function (s, wordDict) {
// // 	let len = s.length
// // 	let dp = Array(len + 1).fill(false)
// // 	dp[0] = true
// // 	let set = new Set(wordDict)

// // 	for (let i = 1; i <= len; i++) {
// // 		for (let j = 0; j < i; j++) {
// // 			if (dp[j] && set.has(s.substr(j, i - j))) {
// // 				dp[i] = true
// // 				break
// // 			}
// // 		}
// // 	}
// // 	return dp[len]
// // }

// // /**
// //  * @param {number[][]} intervals
// //  * @return {number[][]}
// //  */
// // var merge = function (intervals) {
// // 	intervals.sort((a, b) => a[0] - b[0])
// // 	let arr = []
// // 	for (const interval of intervals) {
// // 		const last = arr.at(-1)
// // 		if (last) {
// // 			if (last[1] < interval[0]) arr.push(interval)
// // 			else {
// // 				if (last[1] < interval[1]) last[1] = interval[1]
// // 			}
// // 		} else {
// // 			arr.push(interval)
// // 		}
// // 	}

// // 	return arr
// // }

// // /**
// //  * @param {string} s
// //  * @return {number}
// //  */
// // var firstUniqChar = function (s) {
// // 	let set1 = new Set()
// // 	let set2 = new Set()

// // 	for (const str of s) {
// // 		if (set1.has(str)) {
// // 			set2.add(str)
// // 		} else {
// // 			set1.add(str)
// // 		}
// // 	}

// // 	for (const str of set1) {
// // 		if (!set2.has(str)) return s.indexOf(str)
// // 	}
// // 	return -1
// // }

// // /**
// //  * @param {number[]} height
// //  * @return {number}
// //  */
// // var trap = function (height) {
// // 	let stack = []
// // 	let res = 0
// // 	let len = height.length
// // 	for (let i = 0; i < len; i++) {
// // 		while (stack.length && height[i] > height[stack.at(-1)]) {
// // 			let pop = stack.pop()
// // 			if (!stack.length) break
// // 			let left = stack.at(-1)
// // 			res += (i - left - 1) * (Math.min(height[i], height[left]) - height[pop])
// // 		}
// // 		stack.push(i)
// // 	}
// // 	return res
// // }

// // /**
// //  * @param {number[]} nums
// //  * @return {void} Do not return anything, modify nums in-place instead.
// //  */
// // var moveZeroes = function (nums) {
// // 	let len = nums.length
// // 	let left = 0
// // 	let right = 0

// // 	while (right < len) {
// // 		if (!nums[right]) {
// // 			;[nums[right], nums[left]] = [nums[left], nums[right]]
// // 			left++
// // 		}
// // 		right++
// // 	}
// // }

// // /**
// //  * @param {number} n
// //  * @return {boolean}
// //  */
// // var isHappy = function (n) {
// // 	let set = new Set()
// // 	while (true) {
// // 		if (n === 1) return true
// // 		if (set.has(n)) return false
// // 		set.add(n)
// // 		n = (n + '')
// // 			.split('')
// // 			.map(v => v ** 2)
// // 			.reduce((prev, v) => prev + v)
// // 	}
// // }

// // /**
// //  * @param {number} numRows
// //  * @return {number[][]}
// //  */
// // var generate = function (numRows) {
// // 	if (!numRows) return []
// // 	let res = [[1]]
// // 	let k = 2
// // 	while (k <= numRows) {
// // 		let temp = []
// // 		let prev = res.at(-1)
// // 		for (let i = 0; i < k; i++) {
// // 			temp.push((prev[i - 1] ?? 0) + (prev[i] ?? 0))
// // 		}
// // 		res.push(temp)
// // 		k++
// // 	}
// // 	return res
// // }

// /**
//  * @param {number[]} nums
//  * @return {string}
//  */
// var largestNumber = function (nums) {
// 	nums.sort((a, b) => `${b}${a}` - `${a}${b}`)
// 	return nums.join('')
// }
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number[]}
//  */
// var topKFrequent = function (nums, k) {
// 	let map = {}
// 	for (const num of nums) {
// 		map[num] = (map[num] ?? 0) + 1
// 	}

// 	let res = Object.entries(map).sort((a, b) => b[1] - a[1])

// 	return res.slice(0, k).map(item => item[1])
// }

// /**
//  * @param {number[]} nums
//  * @return {boolean}
//  */
// var increasingTriplet = function (nums) {
// 	let len = nums.length
// 	if (len < 3) return false
// 	let a = nums[0]
// 	let b = Infinity

// 	for (let i = 1; i < len; i++) {
// 		let num = nums[i]
// 		if (num > b) {
// 			return true
// 		} else if (num > a) {
// 			b = num
// 		} else {
// 			a = num
// 		}
// 	}
// 	return false
// }

// /**
//  * @param {number[]} nums
//  * @return {void} Do not return anything, modify nums in-place instead.
//  */
// var sortColors = function (nums) {
// 	let len = nums.length
// 	let left = 0
// 	let right = len - 1

// 	while (left < right) {
// 		while (left < right && nums[right] === 2) right--
// 		while (left < right && nums[left] !== 2) left++
// 		if (left < right) {
// 			;[nums[left], nums[right]] = [nums[right], nums[left]]
// 		}
// 	}
// 	left = 0
// 	let index = nums.findIndex(item => item === 2)
// 	right = index === -1 ? len - 1 : index - 1
// 	while (left < right) {
// 		while (left < right && nums[right] === 1) right--
// 		while (left < right && nums[left] !== 1) left++
// 		if (left < right) {
// 			;[nums[left], nums[right]] = [nums[right], nums[left]]
// 		}
// 	}
// }

// /**
//  * @param {number[]} coins
//  * @param {number} amount
//  * @return {number}
//  */
// var coinChange = function (coins, amount) {
// 	const dp = Array(amount + 1).fill(Infinity)
// 	dp[0] = 0

// 	for (let i = 1; i <= amount; i++) {
// 		for (const coin of coins) {
// 			if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1)
// 		}
// 	}
// 	return dp[amount] === Infinity ? -1 : dp[amount]
// }

// /**
//  * @param {number[]} nums1
//  * @param {number[]} nums2
//  * @return {number[]}
//  */
// // var intersect = function (nums1, nums2) {
// // 	nums1.sort((a, b) => a - b)
// // 	nums2.sort((a, b) => a - b)
// // 	let res = []

// // 	let i = 0
// // 	let j = 0
// // 	let len1 = nums1.length
// // 	let len2 = nums2.length

// // 	while (i < len1 && j < len2) {
// // 		if (nums1[i] === nums2[j]) {
// // 			res.push(nums1[i])
// // 			i++
// // 			j++
// // 		} else if (nums1[i] < nums2[j]) i++
// // 		else j++
// // 	}

// // 	return res
// // }

// var intersect = function (nums1, nums2) {
// 	let map = {}
// 	for (const num of nums1) {
// 		map[num] = (map[num] ?? 0) + 1
// 	}
// 	let res = []
// 	for (const num of nums2) {
// 		if (map[num]) {
// 			res.push(num)
// 			map[num]--
// 		}
// 	}
// 	return res
// }

// /**
//  * @param {ListNode} head
//  * @param {number} n
//  * @return {ListNode}
//  */
// var removeNthFromEnd = function (head, n) {}

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
	if (!head) return head
	let fast = head
	let slow = head
	while (n > 1 && fast) {
		n--
		fast = fast.next
	}
	let prev = slow
	while (fast) {
		fast = fast.next
		prev = slow
		slow = slow.next
	}
	prev.next = slow?.next
	return head
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
	let max = 0
	const dfs = (node, k) => {
		if (!node) return
		if (!node.left && !node.right) max = Math.max(max, k)
		dfs(node.left)
		dfs(node.right)
	}
	dfs(root, 1)
	return max
}
/**
 * @param {number[]} big
 * @param {number[]} small
 * @return {number[]}
 */
var shortestSeq = function (big, small) {
	let set = new Set(small)
	let win = {}
	let left = 0
	let right = 0
	let lefti = 0
	let righti = Infinity
	let lenb = big.length
	let lens = small.length
	let count = 0

	while (right < lenb) {
		let cur = big[right]
		if (set.has(cur)) {
			win[cur] = (win[cur] ?? 0) + 1
			if (win[cur] === 1) count++
		}
		while (count === lens && lenb - left >= lens) {
			let cur2 = big[left]
			if (set.has(cur2)) {
				if (win[cur2] === 1) {
					count--
					if (righti - lefti > right - left) {
						righti = right
						lefti = left
					}
				}
				win[cur2]--
			}
			left++
		}
		right++
	}

	return righti === Infinity ? [] : [lefti, righti]
}

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
	let len = s.length
	let dp = Array.from({ length: len }, () => Array(len).fill(true))

	for (let i = len - 1; i >= 0; i--) {
		for (let j = i + 1; j < len; j++) {
			dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1]
		}
	}

	let res = []
	let temp = []
	const dfs = i => {
		if (i === len) return res.push([...temp])
		for (let j = i; j < len; j++) {
			if (dp[i][j]) {
				temp.push(s.slice(i, j + 1))
				dfs(j + 1)
				temp.pop()
			}
		}
	}
	dfs(0)
	return res
}

/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var findClosest = function (words, word1, word2) {}
