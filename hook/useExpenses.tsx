import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDate } from "../utils/getDate";
import { PostgrestResponse } from "@supabase/supabase-js";
import useCustomSupabaseClient from "./useCustomSupabaseClient";
import { IExpense } from "../type";

export default function useExpenses() {
	const supabaseClient = useCustomSupabaseClient();

	const getExpenses = () => {
		const { firstDay, lastDay } = getDate();
		return supabaseClient
			.from("expense")
			.select(
				`
      *,
      tags (
        name
      ),
      total_expense(
        amount
      )
    `
			)
			.lte("created_at", lastDay)
			.gte("created_at", firstDay)
			.order("created_at", { ascending: false });
	};

	return useQuery(["expenses"], getExpenses, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	}) as UseQueryResult<PostgrestResponse<IExpense>, Error>;
}
