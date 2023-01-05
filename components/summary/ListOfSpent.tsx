import React from "react";

export default function ListOfSpent({ expenses }: { expenses: any[] }) {
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
									{spent.entries} entries
								</p>
							</div>
							<h1 className=" font-semibold text-lg">
								${spent.total}
							</h1>
						</div>
					</div>
				);
			})}
		</div>
	);
}

const groupsTags = (expenses: any[]) => {
	let groups: any = {};

	expenses.forEach(function (val) {
		const tag = val.tags.name;
		if (tag in groups) {
			groups[tag].total += val.amount;
			groups[tag].entries += 1;
		} else {
			groups[tag] = { entries: 1, total: val.amount };
		}
	});
	return groups;
};
