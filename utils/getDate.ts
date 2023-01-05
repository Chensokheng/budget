export const getDate = (current = true) => {
	let date = new Date();
	if (!current) {
		date.setMonth(date.getMonth() - 1);
	}
	const firstDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		1
	).toISOString();
	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).toISOString();
	return { firstDay, lastDay };
};
