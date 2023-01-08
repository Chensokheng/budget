import React from "react";
import {
	HiOutlineChartPie,
	HiOutlinePlus,
	HiOutlineMegaphone,
} from "react-icons/hi2";

import Link from "next/link";

import { useRouter } from "next/router";
import cn from "../utils/cn";
import { useQueryClient } from "@tanstack/react-query";
import useAppState from "../hook/useAppState";

export default function BottomNavigation() {
	const router = useRouter();
	const { data } = useAppState();
	const queryClient = useQueryClient();
	const openExpense = () => {
		if (router.pathname === "/") {
			const updateState = { ...data };
			updateState["isAddingExpense"] = true;
			queryClient.setQueryData(["state"], updateState);
		} else {
			router.push("/");
		}
	};
	return (
		<div className="fixed bottom-0  w-lg h-18 grid grid-cols-3 bg-white px-8 sm:px-0 pb-5 border-t pt-5 z-10">
			<Link href={"/summary"}>
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className={cn(
							"flex items-center flex-col  justify-center",
							router.pathname === "/summary"
								? "text-black"
								: "text-gray-500"
						)}
					>
						<HiOutlineChartPie className="h-8 w-8 group-hover:scale-125 transition-all " />
						<span className="text-sm ">Analytic</span>
					</div>
				</div>
			</Link>
			<AddExpenseNav openExpense={openExpense} />
			<Link href="/logs">
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className={cn(
							"flex items-center flex-col  justify-center",
							router.pathname === "/logs"
								? "text-black"
								: "text-gray-500"
						)}
					>
						<HiOutlineMegaphone className="h-8 w-8 group-hover:scale-125 transition-all" />
						<span className="text-sm">Change logs</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

const AddExpenseNav = ({ openExpense }: { openExpense: () => void }) => {
	return (
		<button
			className="flex justify-center items-center flex-col group cursor-pointer"
			onClick={openExpense}
		>
			<div className="h-12 w-12 bg-yellow-200 group-hover:bg-yellow-300 rounded-full grid place-content-center shadow-sm transition-all groupgroup-hover:hover:text-black">
				<HiOutlinePlus className="h-8 w-8 hover:scale-125 transition-all " />
			</div>
		</button>
	);
};
