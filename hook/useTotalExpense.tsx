import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { getDate } from "../utils/getDate";

export default function useTotalExpense() {
	const supabaseClient = useSupabaseClient();

	const getExpenses = () => {
		const { firstDay, lastDay } = getDate(false);
		return supabaseClient
			.from("total_expense")
			.select()
			.lte("created_at", lastDay)
			.gte("created_at", firstDay);
	};

	return useQuery<any>(["totalExpense"], getExpenses, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	});
}
