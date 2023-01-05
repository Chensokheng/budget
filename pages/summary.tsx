import React from "react";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { FiPieChart } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BsInfo } from "react-icons/bs";
import { GetServerSidePropsContext } from "next";
import { getDate } from "../utils/getDate";
import useExpenses from "../hook/useExpenses";
import TotalSpent from "../components/summary/TotalSpent";
import ListOfSpent from "../components/summary/ListOfSpent";
import Chart from "../components/summary/Chart";
import { useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";

export default function Summary() {
	const user = useUser();
	const { data, isLoading } = useExpenses();

	if (!user) {
		return <Redirect to="/auth" />;
	}

	if (isLoading) {
		return <></>;
	}

	const totalSpent = data?.data[0].total_expense.amount;
	return (
		<SiteLayout>
			<div className="min-h-screen w-full py-10 flex flex-col gap-10 ">
				<TotalSpent spent={totalSpent} />
				<Chart expenses={data.data} />
				<ListOfSpent expenses={data.data} />
			</div>
			<div className="fixed bottom-0  w-lg h-14 grid grid-cols-3 bg-white px-8 sm:px-0 pb-9">
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
			</div>
		</SiteLayout>
	);
}
