import { PostgrestResponse } from "@supabase/supabase-js";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ITotalExpense } from "../type";
import { getDate } from "../utils/getDate";

import useCustomSupabaseClient from "./useCustomSupabaseClient";

export default function useTotalExpense() {
	const supabaseClient = useCustomSupabaseClient();

	const getExpenses = () => {
		const { firstDay, lastDay } = getDate(false);
		return supabaseClient
			.from("total_expense")
			.select()
			.lte("created_at", lastDay)
			.gte("created_at", firstDay);
	};

	return useQuery(["totalExpense"], getExpenses, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	}) as UseQueryResult<PostgrestResponse<ITotalExpense>, Error>;
}
