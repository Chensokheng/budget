import React from "react";
import { IExpense } from "../../type";
import { HiOutlineTag } from "react-icons/hi2";

export default function ListOfSpent({ expenses }: { expenses: IExpense[] }) {
	const result = groupsTags(expenses);
	const mostEntry = Object.keys(result).reduce((a, b) =>
		result[a].entry > result[b].entry ? a : b
	);

	return (
		<>
			<div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 py-3 px-2 rounded-md mb-16 mt-5">
				<div className="flex items-center gap-5 ">
					<div className="h-9 w-9 bg-yellow-200 rounded-full grid place-content-center">
						<HiOutlineTag className="w-6 h-6 text-gray-500" />
					</div>
					<div>
						<h1 className="font-semibold">Most Entry</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{result[mostEntry].entry} on {mostEntry}
						</p>
					</div>
				</div>
				<div>
					<p className="text-center text-lg text-red-400">
						-
						{parseFloat(result[mostEntry].total.toString()).toFixed(
							2
						)}
						$
					</p>
				</div>
			</div>
			<div className="w-full  divide-y dark:divide-zinc-600 flex flex-col gap-5 pb-10">
				{Object.keys(result).map((tag, index) => {
					const spent = result[tag];
					const name = tag.split(" ");
					return (
						<div
							className="flex w-full items-center gap-10 pt-5"
							key={index}
						>
							<span className="text-4xl">{name[0]}</span>
							<div className="flex items-center justify-between flex-1">
								<div>
									<h1 className="text-lg font-semibold capitalize dark:text-slate-100">
										{name[1]}
									</h1>
									<p className="text-gray-500 dark:text-gray-400">
										{spent.entry}{" "}
										{spent.entry > 1 ? "entries" : "entry"}
									</p>
								</div>
								<h1 className=" font-semibold text-lg text-red-400">
									{"$ -"}
									{parseFloat(spent.total.toString()).toFixed(
										2
									)}
								</h1>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

type IEntries = {
	[key: string]: { entry: number; total: number };
};
const groupsTags = (expenses: IExpense[]) => {
	let groups: IEntries = {};

	expenses.forEach(function (val) {
		const tag = val.tags?.name;
		if (tag) {
			if (tag in groups) {
				groups[tag].total += val.amount;
				groups[tag].entry += 1;
			} else {
				groups[tag] = { entry: 1, total: val.amount };
			}
		}
	});
	return groups;
};
