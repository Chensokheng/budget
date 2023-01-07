import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useTags() {
	const supabaseClient = useSupabaseClient();

	const getTags = () => {
		return supabaseClient.from("tags").select();
	};

	return useQuery<any>(["tags"], getTags, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	});
}
