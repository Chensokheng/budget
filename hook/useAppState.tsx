import { useQuery } from "@tanstack/react-query";

export default function useAppState() {
	const getState = () => {
		return {
			isAddingExpense: false,
		};
	};
	return useQuery(["state"], getState);
}
