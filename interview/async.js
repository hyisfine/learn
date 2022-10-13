const sleep = async time => new Promise(resolve => setTimeout(resolve, time))
let start = 0
class Scheduler {
	constructor(max = 2) {
		this.max = max
		this.count = 0
		this.tasksArr = []
	}
	add(task) {
		this.tasksArr.push(task)
		this.run()
	}
	async run() {
		if (this.max === this.count) return
		const task = this.tasksArr.shift()
		if (task) {
			this.count++
			await task()
			this.count--
			this.run()
		}
	}
}

const scheduler = new Scheduler(2)

const addTask = (time, text) => {
	scheduler.add(async () => {
		await sleep(time)
		console.log(Date.now() - start, text)
	})
}
start = Date.now()
addTask(1000, 1)
addTask(900, 2)
addTask(700, 3)
addTask(500, 4)
addTask(200, 5)
