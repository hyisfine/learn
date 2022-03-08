// new Promise((reslove, reject) => {
// 	reject(1)
// })
// 	.catch(() => {
// 		return new Promise((reslove, reject) => {
// 			reject(2)
// 		})
// 	})
// 	.catch(v3 => console.log(v3))

new Promise((resolve, reject) => {
	console.log(1)
	resolve(1)
	console.log('after')
})
	.then(() => {
		new Promise(a => a(1)).then(() => {
			console.log('aaa')
		})
		console.log(2)
	})
	.then(() => {
		console.log(3)
	})

setTimeout(() => {
	console.log(1)
})
