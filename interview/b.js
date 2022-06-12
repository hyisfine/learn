console.log('b1')
let a = 1
export default a
setTimeout(() => {
	a = 2
}, 2000)

console.log('b2')

const xhr = new XMLHttpRequest()
xhr.open('get', '', true)
xhr.send()
xhr.onreadystatechange = event => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200) {
		}
	}
}

fetch('234r', { mode: '' })
