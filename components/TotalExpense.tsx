import React from "react";

export default function TotalExpense() {
	const totalExpense = "295.96".split(".");

	return (
		<div className="h-96 flex justify-center items-center flex-col">
			<h1 className="text-center text-gray-600">Spent this month</h1>
			<div className="flex justify-center mt-5">
				<h1 className="text-4xl text-gray-500">$</h1>
				<h1 className="text-center text-6xl">{totalExpense[0]}</h1>
				<h1 className="text-center  text-4xl">.{totalExpense[1]}</h1>
			</div>
		</div>
	);
}
