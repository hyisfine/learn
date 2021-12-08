// const QuickSort = (arr: number[], low: number, high: number) => {
// 	if (low > high) return

// 	let i = low
// 	let j = high
// 	let x = arr[low]

// 	while (i < j) {
// 		while (i < j && arr[i] <= x) i++
// 		while (i < j && arr[j] >= x) j--

// 		if (i < j) {
// 			const temp = arr[i]
// 			arr[i] = arr[j]
// 			arr[j] = temp
// 		}
// 	}

// 	arr[low] = arr[i]
// 	arr[i] = x

// 	QuickSort(arr, low, i - 1)
// 	QuickSort(arr, i + 1, high)
// }

// const BinarySort = (arr: number[]) => {
// 	if (arr.length < 2) return arr

// 	const middle = arr[0]
// 	const lefts: number[] = []
// 	const rights: number[] = []

// 	arr.forEach((item, index) => {
// 		if (index === 0) return

// 		if (item <= middle) lefts.push(item)
// 		else rights.push(item)
// 	})

// 	return [...BinarySort(lefts), middle, ...BinarySort(rights)]
// }
