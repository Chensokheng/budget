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
				<SummaryNavigation />
			</SiteLayout>
		);
	}

	const totalSpent = data?.data[0].total_expense?.amount;
	return (
		<SiteLayout>
			<div className="min-h-screen w-full py-10 flex flex-col gap-10 ">
				<TotalSpent spent={totalSpent || 0} />
				<Chart expenses={data.data} />
				<ListOfSpent expenses={data.data} />
			</div>
			<SummaryNavigation />
		</SiteLayout>
	);
}

const SummaryNavigation = () => {
	const supabase = useSupabaseClient();
	return (
		<div className="fixed bottom-0  w-lg h-14 grid grid-cols-4 bg-white px-8 sm:px-0 pb-9">
			<div className="flex justify-center items-center flex-col group cursor-pointer">
				<Link href="/summary">
					<FiPieChart className="h-8 w-8 group-hover:scale-125 transition-all" />
				</Link>
			</div>
			<div className="flex justify-center items-center flex-col group cursor-pointer">
				<Link href="/">
					<CgAddR className="h-8 w-8 hover:scale-125 transition-all" />
				</Link>
			</div>
			<div className="flex justify-center items-center flex-col group cursor-pointer">
				<Link href="/logs">
					<BsInfo className="h-8 w-8 group-hover:scale-125 transition-all" />
				</Link>
			</div>
			<div
				className="flex justify-center items-center flex-col group cursor-pointer"
				onClick={async () => {
					await supabase.auth.signOut();
				}}
			>
				<AiOutlineLogout className="h-8 w-8 group-hover:scale-125 transition-all" />
			</div>
		</div>
	);
};
