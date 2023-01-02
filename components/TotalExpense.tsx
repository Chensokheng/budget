import React from "react";
import { toast } from "react-hot-toast";
import useExpenses from "../hook/useExpenses";

export default function TotalExpense() {
	const { data, isLoading } = useExpenses();

	if (isLoading) {
		return (
			<div className="h-96 flex justify-center items-center flex-col gap-5 ">
				<div className="h-5 w-56 bg-gray-300 animate-pulse rounded-sm"></div>
				<div className="w-48 h-14 animate-pulse bg-gray-300 rounded-sm"></div>
			</div>
		);
	}

	if (data?.error) {
		toast.error(data?.error.message);
		return <></>;
	}
	let amount = [0, 0];

	if (data.data.length) {
		amount = data?.data[0].total_expense.amount.toString().split(".");
	}

	return (
		<div className="h-56 flex justify-center items-center flex-col">
			<h1 className="text-center text-gray-500">Spent this month</h1>
			<div className="flex justify-center mt-5">
				<h1 className="text-4xl text-gray-500">$</h1>
				<h1 className="text-center text-6xl">{amount[0]}</h1>
				<h1 className="text-center  text-4xl">.{amount[1] || "00"}</h1>
			</div>
		</div>
	);
}
