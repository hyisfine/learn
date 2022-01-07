// class TreeNode {
// 	constructor(data, left, right) {
// 		this.data = data
// 		this.left = left
// 		this.right = right
// 	}

// 	addLeftNode(left) {
// 		this.left = left
// 	}

// 	addRightNode(right) {
// 		this.right = right
// 	}
// }

// class Tree {
// 	constructor(data, left, right) {
// 		this.tree = new TreeNode(data, left, right)
// 	}

// 	traverse() {}
// }

// class ArrTree {
// 	constructor() {
// 		this.arr = []
// 	}

// 	getRoot() {
// 		const flagArr = Array(this.arr.length).fill(0)
// 		this.arr.forEach((item) => {
// 			if (item.left !== -1) flagArr[item.left] = 1
// 			if (item.right !== -1) flagArr[item.right] = 1
// 		})

// 		const index = flagArr.findIndex((item) => item === 0)
// 		return index
// 	}

// 	traverse(type = 0) {
// 		const rootIndex = this.getRoot()

// 		const loop = (node) => {
// 			if (!node) return
// 			type === 0 && console.log(node.data)
// 			loop(this.arr[node.left])
// 			type === 1 && console.log(node.data)
// 			loop(this.arr[node.right])
// 			type === 2 && console.log(node.data)
// 		}

// 		loop(this.arr[rootIndex])
// 	}
// }

// const at = new ArrTree()
// at.arr[0] = new TreeNode('C', -1, -1)
// at.arr[1] = new TreeNode('B', 0, 2)
// at.arr[2] = new TreeNode('D', -1, -1)
// at.arr[3] = new TreeNode('A', 1, 5)
// at.arr[4] = new TreeNode('F', -1, -1)
// at.arr[5] = new TreeNode('E', 4, 6)
// at.arr[6] = new TreeNode('G', -1, -1)

// class SearchTree {
// 	constructor() {
// 		this.tree = null
// 	}

// 	find(data) {
// 		let node = this.tree
// 		while (true) {
// 			if (data > node.data) {
// 				node = node.right
// 			} else if (data < node.data) {
// 				node = node.left
// 			} else return node

// 			if (!node) return console.log('未找到')
// 		}
// 	}

// 	insert(data) {
// 		if (!this.tree) {
// 			this.tree = new TreeNode(data, null, null)
// 			return
// 		}

// 		let node = this.tree
// 		while (true) {
// 			if (data >= node.data) {
// 				if (!node.right) {
// 					node.right = new TreeNode(data, null, null)
// 					break
// 				} else node = node.right
// 			} else {
// 				if (!node.left) {
// 					node.left = new TreeNode(data, null, null)
// 					break
// 				} else node = node.left
// 			}
// 		}
// 	}

// 	delete(data) {
// 		let node = this.tree

// 		const loop = (data, node) => {
// 			switch (true) {
// 				case !node:
// 					return console.log('删除元素未找到')
// 				case data < node.data:
// 					node.left = loop(data, node.left)
// 					break
// 				case data > node.data:
// 					node.right = loop(data, node.right)
// 					break
// 				default:
// 					switch (true) {
// 						case node.right && node.left:
// 							const min = findMin(node.right)
// 							node.data = min.data
// 							node.right = loop(node.data, node.right)
// 							break
// 						case !node.right:
// 							node = node.left
// 							break
// 						case !node.left:
// 							node = node.right
// 							break
// 					}
// 					break
// 			}

// 			return node
// 		}

// 		loop(data, node)
// 	}
// }

// const findMin = (tree) => {
// 	let node = tree
// 	while (true) {
// 		if (!node.left) return node
// 		node = node.left
// 	}
// }

// const st = new SearchTree()

// st.insert(5)
// st.insert(0)
// st.insert(1)
// st.insert(7)
// st.insert(8)
// st.insert(3)
// st.insert(2)
// st.insert(4)
// st.insert(9)
// st.insert(6)

// // console.log(st.tree)
// // console.log(st.find(11))

// st.delete(7)
// console.log(st.tree)

// class Heap {
// 	constructor() {
// 		this.arr = [0]
// 		this.size = 0
// 	}

// 	insert(data) {
// 		let i = ++this.size
// 		while (true) {
// 			const _i = Math.floor(i / 2)
// 			const p = this.arr[_i]
// 			if (p < data) {
// 				this.arr[i] = p
// 				i = _i
// 				if (i === 1) break
// 			} else break
// 		}

// 		this.arr[i] = data
// 	}

// 	delete() {
// 		const temp = this.arr.pop()
// 		let i = 1
// 		this.arr[1] = temp

// 		while (true) {
// 			const left = this.arr[i * 2]
// 			const right = this.arr[i * 2 + 1]

// 			if (left >= right && left > temp) {
// 				this.arr[i] = this.arr[i * 2]
// 				this.arr[i * 2] = temp
// 				i = i * 2
// 				continue
// 			}

// 			if (left < right && right > temp) {
// 				this.arr[i] = this.arr[i * 2 + 1]
// 				this.arr[i * 2 + 1] = temp
// 				i = i * 2 + 1
// 				continue
// 			}

// 			break
// 		}
// 	}
// }

// const heap = new Heap()
// heap.insert(0)
// heap.insert(1)
// heap.insert(2)
// heap.insert(2)
// heap.insert(2)
// heap.insert(3)
// heap.insert(3)
// heap.insert(4)
// heap.insert(4)
// heap.insert(0)
// heap.insert(5)
// heap.insert(7)

// heap.delete()
// heap.delete()
// heap.delete()
// heap.delete()
// console.log(heap.arr, heap.size)

const isEmpty = node => typeof node === 'undefined'

const changeTemp = (arr, i, j) => {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

class HuffManTree {
	constructor(arr) {
		this.arr = arr
		this.maxArr = []
		// this.buildMaxTree()
		this.buildMinTree()
		this.balance()
	}

	buildMinTree() {
		const lastPNode = this.getLastPNode(this.arr.length)

		for (let i = lastPNode; i >= 0; i--) {
			let j = i
			while (true) {
				const p = this.arr[j]
				const l = this.arr[j * 2 + 1]
				const r = this.arr[j * 2 + 2]

				if ((isEmpty(r) || l <= r) && l < p) {
					changeTemp(this.arr, j, j * 2 + 1)
					j = j * 2 + 1
					continue
				}
				if (r < l && r < p) {
					changeTemp(this.arr, j, j * 2 + 2)
					j = j * 2 + 2
					continue
				}
				break
			}
		}
	}

	getLastPNode(len) {
		const lastPNode = len % 2 === 0 ? (len - 2) / 2 : (len - 3) / 2
		return lastPNode
	}

	insertMin(data) {
		this.arr.push(data)
		let i = this.arr.length - 1

		while (true) {
			const p = this.arr[this.getLastPNode(i)]
			if (p > data) {
				changeTemp(this.arr, i, this.getLastPNode(i))
				i = this.getLastPNode(i)
			} else break
		}
	}

	insertMax(data) {
		this.maxArr.push(data)
		let i = this.maxArr.length - 1

		while (true) {
			const p = this.maxArr[this.getLastPNode(i)]
			if (p < data) {
				changeTemp(this.maxArr, i, this.getLastPNode(i))
				i = this.getLastPNode(i)
			} else break
		}
	}

	delete() {
		const max = this.arr.pop()
		if (this.arr.length === 0) return max
		this.arr[0] = max

		let i = 0
		while (true) {
			const p = this.arr[i]
			const l = this.arr[i * 2 + 1]
			const r = this.arr[i * 2 + 2]

			if ((isEmpty(r) || l <= r) && l < p) {
				changeTemp(this.arr, i, i * 2 + 1)
				i = i * 2 + 1
				continue
			}
			if (r < l && r < p) {
				changeTemp(this.arr, i, i * 2 + 2)
				i = i * 2 + 2
				continue
			}
			break
		}
		return max
	}

	balance() {
		while (this.arr.length) {
			const l = this.delete()
			const r = this.delete()
			this.insertMax(r)
			this.insertMax(l)
			if (!isEmpty(r)) this.insertMin(r + l)
		}
	}

	clear() {
		const lastP = Math.floor(this.size / 2)

		const __ = data => typeof data === 'undefined'

		for (let i = lastP; i >= 1; i--) {
			let _i = i
			const p = this.arr[i]
			while (true) {
				const left = this.arr[_i * 2]
				const right = this.arr[_i * 2 + 1]
				if ((__(right) || left > right) && left >= p) {
					this.arr[_i] = left
					this.arr[_i * 2] = p
					_i = _i * 2
					continue
				}

				if (right >= left && right >= p) {
					this.arr[_i] = right
					this.arr[_i * 2 + 1] = p
					_i = _i * 2 + 1
					continue
				}

				break
			}
		}
	}
}

const heap = new Heap()
heap.insert(0)
heap.insert(1)
heap.insert(2)
heap.insert(2)
heap.insert(2)
heap.insert(3)
heap.insert(3)
heap.insert(4)
heap.insert(4)
heap.insert(0)
heap.insert(5)
heap.insert(7)
console.log(heap.arr)
heap.arr = [0, 0, 1, 2, 2, 2, 3, 3, 4, 4, 0, 5, 7]
console.log(heap.arr)
heap.clear()
console.log(heap.arr)
