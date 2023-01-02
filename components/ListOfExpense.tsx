import React from "react";

import { Toaster } from "react-hot-toast";
import useExpenses from "../hook/useExpenses";

export default function ListOfExpense() {
	const { data, isLoading } = useExpenses();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	const expenses = groupsDate(data.data);

	return (
		<>
			<div className="w-full bg mt-20 flex flex-col gap-5 ">
				{Object.keys(expenses).map((date: string, index: number) => {
					let convertDate = new Date(date).toLocaleDateString();
					const today = new Date().toLocaleString().split(",")[0];
					convertDate = convertDate === today ? "Today" : convertDate;
					return (
						<div key={index} className="divide-y">
							<div className="pb-3 flex justify-between items-center">
								<h1 className="text-gray-400">{convertDate}</h1>
								<h1 className="text-gray-400">
									${" "}
									{parseFloat(expenses[date].total).toFixed(
										2
									)}
								</h1>
							</div>
							{expenses[date]["data"].map(
								(expense: any, key: number) => {
									const tag = expense.tags.name.split(" ");
									const time = new Date(
										expense.created_at
									).toLocaleTimeString("en-Us", {
										hour: "2-digit",
										minute: "2-digit",
									});
									return (
										<div
											className="w-full flex justify-between items-center pt-3 pb-3"
											key={index}
										>
											<div className="flex items-center gap-5">
												<h1 className="text-3xl">
													{tag[0]}
												</h1>
												<div>
													<h1 className="fold-bold text-lg">
														{tag[1]}
													</h1>
													<p className="text-gray-400">
														{time}
													</p>
												</div>
											</div>
											<h1 className="fold-bold text-lg">
												$ {parseFloat(expense.amount)}
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

const groupsDate = (expenses: any[]) => {
	let groups: any = {};

	expenses.forEach(function (val) {
		const date = new Date(val.created_at).toLocaleDateString();
		if (date in groups) {
			groups[date].data.push(val);
			groups[date].total += val.amount;
		} else {
			groups[date] = { data: new Array(val), total: val.amount };
		}
	});
	return groups;
};
