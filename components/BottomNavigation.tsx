import React from "react";
import {
	HiOutlineChartPie,
	HiOutlinePlus,
	HiOutlineMegaphone,
} from "react-icons/hi2";
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
	const navigate = (path: string) => {
		router.push(path);
		if (router.pathname !== path && data?.isAddingExpense) {
			const updateState = { ...data };
			updateState["isAddingExpense"] = false;
			queryClient.setQueryData(["state"], updateState);
		}
	};

	return (
		<div className="fixed bottom-0  w-lg h-18 grid grid-cols-3 bg-white dark:bg-black px-8 sm:px-0 pb-5 border-t pt-5 z-10 dark:border-zinc-600">
			<button onClick={() => navigate("/summary")}>
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className={cn(
							"flex items-center flex-col  justify-center",
							router.pathname === "/summary"
								? "text-black dark:text-white"
								: "text-gray-500 dark:text-gray-400"
						)}
					>
						<HiOutlineChartPie className="h-6 w-6 group-hover:scale-125 transition-all " />
						<span className="text-sm ">Analytic</span>
					</div>
				</div>
			</button>
			<AddExpenseNav openExpense={openExpense} />
			<button onClick={() => navigate("/logs")}>
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className={cn(
							"flex items-center flex-col  justify-center ",
							router.pathname === "/logs"
								? "text-black dark:text-white"
								: "text-gray-500 dark:text-gray-400"
						)}
					>
						<HiOutlineMegaphone className="h-6 w-6 group-hover:scale-125 transition-all" />
						<span className="text-sm">Change logs</span>
					</div>
				</div>
			</button>
		</div>
	);
}

const AddExpenseNav = ({ openExpense }: { openExpense: () => void }) => {
	return (
		<button
			className="flex justify-center items-center flex-col group cursor-pointer"
			onClick={openExpense}
		>
			<div className="h-12 w-12 bg-yellow-200 group-hover:bg-yellow-300 rounded-full grid place-content-center shadow-sm transition-all groupgroup-hover:hover:text-black dark:text-black dark:bg-yellow-300">
				<HiOutlinePlus className="h-8 w-8 hover:scale-125 transition-all " />
			</div>
		</button>
	);
};
