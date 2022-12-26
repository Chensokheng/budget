import { useQuery } from "react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { getDate } from "../utils/getDate";

export default function useExpenses() {
	const supabaseClient = useSupabaseClient();

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

	return useQuery<any>("expenses", getExpenses, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	});
}
