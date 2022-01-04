package main

func exchange(nums []int) []int {
	i := 0
	j := len(nums) - 1

	for i < j {
		for i < j && nums[i]&1 == 1 {
			i++
		}
		for i < j && nums[j]&1 == 0 {
			j--
		}

		if i < j {
			nums[i], nums[j] = nums[j], nums[i]
		}
		i++
		j--
	}

	return nums
}
