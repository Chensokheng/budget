import React from "react";
import { CgAddR } from "react-icons/cg";
import { BsInfo } from "react-icons/bs";
import { FiPieChart } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";

import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function BottomNavigation({
	addExpense,
}: {
	addExpense: () => void;
}) {
	const supabase = useSupabaseClient();
	return (
		<div className="fixed bottom-0  w-lg h-14 grid grid-cols-4 bg-white px-8 sm:px-0 pb-9">
			<div className="flex justify-center items-center flex-col group cursor-pointer">
				<Link href="/summary">
					<FiPieChart className="h-8 w-8 group-hover:scale-125 transition-all" />
				</Link>
			</div>
			<div
				className="flex justify-center items-center flex-col group cursor-pointer"
				onClick={addExpense}
			>
				<CgAddR className="h-8 w-8 hover:scale-125 transition-all" />
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
}
