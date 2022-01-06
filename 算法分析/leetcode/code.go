package main

import "container/list"

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

type CQueue struct {
	stack1, stack2 *list.List
}

func Constructor() CQueue {
	return CQueue{
		stack1: list.New(),
		stack2: list.New(),
	}
}

func (this *CQueue) AppendTail(value int) {
	this.stack1.PushBack(value)
}

func (this *CQueue) DeleteHead() int {
	// 如果第二个栈为空
	if this.stack2.Len() == 0 {
		for this.stack1.Len() > 0 {
			this.stack2.PushBack(this.stack1.Remove(this.stack1.Back()))
		}
	}
	if this.stack2.Len() != 0 {
		e := this.stack2.Back()
		this.stack2.Remove(e)
		return e.Value.(int)
	}
	return -1
}
