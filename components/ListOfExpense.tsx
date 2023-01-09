import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);
import React from "react";
import { Toaster } from "react-hot-toast";
import useExpenses from "../hook/useExpenses";
import { IExpense } from "../type";

export default function ListOfExpense() {
	const { data, isLoading } = useExpenses();

	if (isLoading) {
		return (
			<div className="flex flex-col gap-5">
				<div className=" animate-pulse bg-gray-300 h-10 rounded-md"></div>
				<div className=" animate-pulse bg-gray-300 h-10 rounded-md"></div>
				<div className=" animate-pulse bg-gray-300 h-10 rounded-md"></div>
			</div>
		);
	}
	if (!data?.data?.length) {
		return (
			<div className="h-72">
				<h1 className="text-center text-gray-500 dark:text-gray-400">
					{"No expense records yet."}
				</h1>{" "}
			</div>
		);
	}
	const expenses = groupsDate(data.data);

	return (
		<>
			<div className="w-full bg mt-20 flex flex-col gap-5 pb-14 divide-y dark:divide-zinc-600 ">
				{Object.keys(expenses).map((date: string, index: number) => {
					return (
						<div key={index} className="pt-5">
							<div className="pb-3 flex justify-between items-center">
								<h1 className="text-gray-500 dark:text-gray-400">
									{date}
								</h1>
								<h1 className="text-gray-500 dark:text-gray-400">
									{"$ -"}
									{parseFloat(
										expenses[date].total.toString()
									).toFixed(2)}
								</h1>
							</div>
							{expenses[date]["data"].map(
								(expense, key: number) => {
									const tag = expense.tags?.name.split(
										" "
									) || ["", ""];
									const time = new Date(
										expense.created_at
									).toLocaleTimeString("en-Us", {
										hour: "2-digit",
										minute: "2-digit",
									});
									return (
										<div
											className="w-full flex justify-between items-center pt-3 pb-3"
											key={key}
										>
											<div className="flex items-center gap-5">
												<h1 className="text-4xl">
													{tag[0]}
												</h1>
												<div>
													<h1 className=" font-semibold text-lg capitalize dark:text-slate-100">
														{tag[1]}
													</h1>
													<p className="text-gray-500">
														{time}
													</p>
												</div>
											</div>
											<h1 className="font-semibold text-lg text-red-400">
												{"- "}
												{parseFloat(
													expense.amount.toString()
												)}
												{"$"}
											</h1>
										</div>
									);
								}
							)}
						</div>
					);
				})}
			</div>
			<Toaster position="top-center" />
		</>
	);
}

const groupsDate = (expenses: IExpense[]) => {
	type IGroup = {
		[name: string]: {
			data: IExpense[];
			total: number;
		};
	};

	let groups: IGroup = {};

	expenses.forEach(function (val) {
		let date = dayjs(val.created_at).calendar().split(" ")[0];
		if (date !== "Today" && date !== "Yesterday") {
			date = dayjs(val.created_at).format("MMM D, YYYY");
		}
		if (date in groups) {
			groups[date].data.push(val);
			groups[date].total += val.amount;
		} else {
			groups[date] = { data: new Array(val), total: val.amount };
		}
	});
	return groups;
};
