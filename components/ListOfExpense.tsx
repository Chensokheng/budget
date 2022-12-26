import React, { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "react-hot-toast";

export default function ListOfExpense() {
	const [expenses, setExpenses] = useState<any>([]);
	const supabaseClient = useSupabaseClient();

	const getExpenses = async () => {
		const date = new Date();
		const firstDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			1
		).toISOString();
		const lastDay = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0
		).toISOString();
		const { data, error } = await supabaseClient
			.from("expense")
			.select(
				`
      *,
      tags (
        name
      )
    `
			)
			.lte("created_at", lastDay)
			.gte("created_at", firstDay)
			.order("created_at", { ascending: false });
		if (error) {
			return toast.error(error.message);
		}
		setExpenses(groupsDate(data) || []);
	};

	useEffect(() => {
		getExpenses();
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<div className="w-full bg mt-20 flex flex-col gap-5 ">
				{Object.keys(expenses).map((date: string, index: number) => {
					console.log(date);
					let convertDate = new Date(date).toLocaleDateString();
					const today = new Date().toLocaleString().split(",")[0];
					convertDate = convertDate === today ? "Today" : convertDate;
					return (
						<div key={index} className="divide-y">
							<div className="pb-3 flex justify-between items-center">
								<h1 className="text-gray-400">{convertDate}</h1>
								<h1 className="text-gray-400">
									${expenses[date].total}
								</h1>
							</div>
							{expenses[date]["data"].map(
								(expense: any, key: number) => {
									const tag = expense.tags.name.split(" ");
									const time = new Date(
										expense.created_at
									).toLocaleTimeString([], {
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
		var date = val.created_at.split("T")[0];
		if (date in groups) {
			groups[date].data.push(val);
			groups[date].total += val.amount;
		} else {
			groups[date] = { data: new Array(val), total: val.amount };
		}
	});

	return groups;
};
