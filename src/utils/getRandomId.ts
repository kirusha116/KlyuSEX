export function getRandomId():string {

	const chars:string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let res:string = '';

	for (let i = 0; i < 8; i++) {
		res += chars[Math.floor(Math.random() * chars.length)];
	}

	return res;
}