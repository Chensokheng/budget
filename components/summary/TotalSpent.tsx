import React from "react";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import useTotalExpense from "../../hook/useTotalExpense";
import { ITotalExpense } from "../../type";

export default function TotalSpent({ spent }: { spent: number }) {
	const { data, isLoading } = useTotalExpense();
	return (
		<div>
			<h1 className="text-5xl font-semibold mb-2 text-red-500">
				{"$ -"}
				{spent}
			</h1>
			<div className="flex gap-2 items-center">
				<span className="text-gray-500 dark:text-gray-400">
					Total spent this month
				</span>
				<Percentage
					isLoading={isLoading}
					lastMonth={data?.data}
					thisMonth={spent}
				/>
			</div>
		</div>
	);
}

const Percentage = ({
	isLoading,
	lastMonth,
	thisMonth,
}: {
	isLoading: boolean;
	lastMonth: ITotalExpense[] | null | undefined;
	thisMonth: number;
}) => {
	if (isLoading) {
		return <></>;
	}
	let spentLastMonth = 0;

	if (lastMonth?.length) {
		spentLastMonth = lastMonth[0].amount;
	}

	const value = getPercentTagDiff(spentLastMonth, thisMonth);
	if (value === 0) {
		return <></>;
	}
	const increase = value > 0;
	return (
		<div className="flex items-center gap-2">
			{increase ? (
				<div className="h-5 w-5 rounded-full bg-red-200 dark:bg-red-400 dark:bg-opacity-50 grid place-content-center">
					<BiUpArrowAlt className="text-red-500 dark:text-red-300" />
				</div>
			) : (
				<div className="h-5 w-5 rounded-full bg-green-200 grid place-content-center">
					<BiDownArrowAlt className="text-green-500" />
				</div>
			)}
			<span className={`${increase ? "text-red-500" : "text-green-500"}`}>
				{value.toFixed(2)}%
			</span>
		</div>
	);
};

const getPercentTagDiff = (lastMonth: number = 0, thisMonth: number = 0) => {
	let res = ((thisMonth - lastMonth) / lastMonth) * 100;
	if (res === Infinity) {
		res = 0;
	}
	return res;
};
