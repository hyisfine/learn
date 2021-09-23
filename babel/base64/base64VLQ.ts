const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const base64VLQ = (num) => {
	let binary = num.toString(2); //  转二进制
	while (binary.length % 5 < 4) {
		binary = `0${binary}`; //  前置补0
	}

	let binaryArr: string[] = [];
	binaryArr[0] = binary.substring(0, 4); //  划分第一个单元
	const othersBinary = binary.substring(4).match(/[01]{5}/g) || []; //  划分其他单元
	binaryArr.push(...othersBinary);

	//  所以单位前置结束位
	binaryArr = binaryArr.map((item, i, arr) => `${arr.length - 1 === i ? 0 : 1}${item}`);
	//  第一个单位后置正负位
	binaryArr[0] = `${binaryArr[0]}${num >= 0 ? 0 : 1}`;

	// 转到base64编码
	let baseStr = '';
	binaryArr.map((code) => (baseStr += base64Chars[parseInt(code, 2)]));
	return baseStr;
};
