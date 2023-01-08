import React from "react";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

import { FiPieChart } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BsInfo } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import useExpenses from "../hook/useExpenses";
import TotalSpent from "../components/summary/TotalSpent";
import ListOfSpent from "../components/summary/ListOfSpent";

const Chart = dynamic(() => import("../components/summary/Chart"));
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";
import dynamic from "next/dynamic";
import BottomNavigation from "../components/BottomNavigation";

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
		<div className="min-h-screen w-full py-10 flex flex-col gap-10 pb-20 px-3 ">
			<TotalSpent spent={totalSpent || 0} />
			<Chart expenses={data.data} />
			<ListOfSpent expenses={data.data} />
		</div>
	);
}
