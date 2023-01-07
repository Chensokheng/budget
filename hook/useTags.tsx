import { PostgrestResponse } from "@supabase/supabase-js";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ITag } from "../type";
import useCustomSupabaseClient from "./useCustomSupabaseClient";

export default function useTags() {
	const supabaseClient = useCustomSupabaseClient();

	const getTags = () => {
		return supabaseClient.from("tags").select();
	};

	return useQuery(["tags"], getTags, {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
	}) as UseQueryResult<PostgrestResponse<ITag>, Error>;
}
