class OperatorStack {
	charArr = []
	expressionArr = []
	numberArr = []

	charMap = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
		'(': 0,
		')': 0
	}

	change(strs) {
		strs.forEach((item) => {
			if (/\d/g.test(item)) {
				this.expressionArr.push(item)
				return
			}

			let top
			switch (item) {
				case '(':
					this.charArr.push(item)
					break

				case ')':
					top = this.charArr.pop()
					while (top !== '(') {
						this.expressionArr.push(top)
						top = this.charArr.pop()
					}
					break

				default:
					top = this.charArr[this.charArr.length - 1]
					while (true) {
						if (!this.charArr.length) {
							this.charArr.push(item)
							break
						}

						if (this.charMap[top] >= this.charMap[item]) {
							this.expressionArr.push(top)
							this.charArr.pop()
							top = this.charArr[this.charArr.length - 1]
						} else {
							this.charArr.push(item)
							break
						}
					}
			}

			console.log('charArr:', this.charArr)
			console.log('expressionArr:', this.expressionArr)
		})

		this.expressionArr.push(...this.charArr)

		return this.expressionArr
	}
}

const os = new OperatorStack()

console.log(os.change(['2', '*', '(', '9', '+', '6', '/', '3', '-', '5', ')', '+', '4']))
