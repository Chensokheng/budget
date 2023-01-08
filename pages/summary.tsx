import React from "react";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

import useExpenses from "../hook/useExpenses";
import TotalSpent from "../components/summary/TotalSpent";
import ListOfSpent from "../components/summary/ListOfSpent";

const Chart = dynamic(() => import("../components/summary/Chart"));
import { useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";
import dynamic from "next/dynamic";

export default function Summary() {
	const user = useUser();
	const { data, isLoading } = useExpenses();

	if (!user) {
		return <Redirect to="/auth" />;
	}

	if (isLoading) {
		return <></>;
	}

	if (!data?.data?.length) {
		return (
			<SiteLayout>
				<h1>{"You don't have any expenses yet."}</h1>
			</SiteLayout>
		);
	}

	const totalSpent = data?.data[0].total_expense?.amount;
	return (
		<div className="min-h-screen w-full pt-14 flex flex-col pb-20 ">
			<TotalSpent spent={totalSpent || 0} />
			<Chart expenses={data.data} />
			<ListOfSpent expenses={data.data} />
		</div>
	);
}
