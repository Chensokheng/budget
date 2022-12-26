export const getDate = () => {
	const date = new Date();
	const firstDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		1
	).toLocaleDateString();
	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).toLocaleDateString();
	return { firstDay, lastDay };
};
