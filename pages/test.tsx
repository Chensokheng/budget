import React, { useEffect } from "react";
import useCustomSupabaseClient from "../hook/useCustomSupabaseClient";
import useExpenses from "../hook/useExpenses";
import useTags from "../hook/useTags";
import useTotalExpense from "../hook/useTotalExpense";

import { ITotalExpense } from "../type";

export default function Test() {
	const { data, isLoading } = useExpenses();
	if (isLoading) {
		return <></>;
	}
	return <></>;
	// return (
	// 	<div>
	// 		<button>{JSON.stringify()}</button>
	// 	</div>
	// );
}
