import React from "react";
import { IExpense } from "../../type";

export default function ListOfSpent({ expenses }: { expenses: IExpense[] }) {
	const result = groupsTags(expenses);

	return (
		<div className="w-full mt-10 divide-y flex flex-col gap-5 pb-10">
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
								<h1 className="text-lg font-semibold capitalize">
									{name[1]}
								</h1>
								<p className="text-gray-500">
									{spent.entry}{" "}
									{spent.entry > 1 ? "entries" : "entry"}
								</p>
							</div>
							<h1 className=" font-semibold text-lg">
								${parseFloat(spent.total.toString()).toFixed(2)}
							</h1>
						</div>
					</div>
				);
			})}
		</div>
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
