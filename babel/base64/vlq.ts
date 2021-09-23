const num2vlq = (num) => {
	let binary = num.toString(2); //  转二进制
	while (binary.length % 7 < 6) {
		binary = `0${binary}`; //  前置补0
	}

	let binaryArr = [];
	binaryArr[0] = binary.substring(0, 6); //  划分第一个单元
	const othersBinary = binary.substring(6).match(/[01]{7}/g) || []; //  划分其他单元
	binaryArr.push(...othersBinary);

	//  所以单位前置结束位
	binaryArr = binaryArr.map((item, i, arr) => `${arr.length - 1 === i ? 0 : 1}${item}`);
	//  第一个单位后置正负位
	binaryArr[0] = `${binaryArr[0]}${num >= 0 ? 0 : 1}`;

	return binaryArr;
};

console.log(num2vlq(255));
