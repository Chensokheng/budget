import { useQuery } from "@tanstack/react-query";

export default function useIsAddExpense() {
	const getState = async () => {
		return false;
	};
	return useQuery<any>(["state"], getState, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	});
}
