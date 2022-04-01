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
