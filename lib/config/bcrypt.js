import bcrypt from 'bcrypt';
const saltrounds = 10;

export async function hashPassword(pw) {
	const hash = await bcrypt.hash(pw, saltrounds);
	return hash;
}

export async function comparePassword(hashed, unhashed) {
	const comparison = await bcrypt.compare(unhashed, hashed);
	return comparison;
}