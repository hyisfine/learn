console.log('a1');
import b from './b.js'
console.log(b);
setTimeout(() => {
    console.log(b);
}, 3000);
console.log('a2');
