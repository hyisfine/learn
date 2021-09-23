const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const ascii2base64 = (str) => {
	let baseStr = '';
	// 按3位字符为一组切割原字符串。 'ABCD' => 'ABC' 'D'
	const strArr = str.match(/.{1,3}/gs);
	if (!strArr) return baseStr;

	strArr.forEach((str) => {
		//分割字符串为单个字符  'ABC' => 'A' 'B' 'c'
		const chars = str.split('');
		const len = str.length;

		// 将字符转为8位二进制 ‘A’ => 01000001
		const charsCodes = chars.map((char) => extraASCIICode(char));
		console.log('charsCodes:', charsCodes);

		// 将8位二进制分割成6位二进制并补全0
		const base64Codes = split8To6(charsCodes);
		console.log('base64Codes:', base64Codes);

		// 循环切割好的6位二进制，转二进制成相应的数字，并取base64字符集中相应的字符进行拼接
		base64Codes.map((code) => (baseStr += base64Chars[parseInt(code, 2)]));
		if (len < 3) {
			baseStr += len === 1 ? '==' : '='; //    最后进行长度小于3的补位操作
		}
		return baseStr;
	});

	return baseStr;
};

const extraASCIICode = (char) => {
	let binary8 = char.codePointAt(0).toString(2); // 'A' => 65 => 01000001
	while (binary8.length < 8) {
		binary8 = `0${binary8}`; // js并不会完整输出8位二进制，需要补全0
	}
	return binary8;
};

const split8To6 = (charsCodes) => {
	// 将3组8位二进制拼成24位二进制并切割成4组6位二进制
	const binary6s = charsCodes.join('').match(/[01]{1,6}/g);
	if (!binary6s) return [];

	const len = charsCodes.length;
	switch (len) {
		case 1:
			binary6s[1] = `${binary6s}0000`; //  当字符串长度为1 情况1
			break;

		case 2:
			binary6s[2] = `${binary6s}00`; //  当字符串长度为2 情况2
			break;
	}

	return binary6s;
};

console.log(ascii2base64('ABC'));
console.log(ascii2base64('AB'));
console.log(ascii2base64('AC'));
