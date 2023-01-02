export const getDate = () => {
	const date = new Date();
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
