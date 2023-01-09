import React from "react";
import dayjs from "dayjs";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { IExpense } from "../../type";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function Chart({ expenses }: { expenses: IExpense[] }) {
	const data = generateData(expenses);
	const highSpent = Object.keys(data).reduce((a, b) =>
		data[a] > data[b] ? a : b
	);

	return (
		<>
			<div className="w-full h-64">
				<Bar
					options={{
						maintainAspectRatio: false,
						responsive: true,

						scales: {
							x: {
								border: { display: false },
								grid: {
									display: false,
									drawTicks: false,
								},
								beginAtZero: true,
								ticks: {
									maxTicksLimit: 6,
									minRotation: 360,
								},
							},
							y: {
								border: { display: false, dash: [5] },
								grid: {
									display: true,
									color: (context) => {
										if (
											context.tick.value === 50 ||
											context.tick.value === 110
										) {
											return "rgb(0,0,0)";
										}
									},
									drawTicks: false,
								},
								ticks: {
									stepSize: 50,
									color: (ctx, options) => {
										if (ctx.tick.value === 50) {
											return "rgb(0,0,0)";
										} else {
											return "rgb(107,114,128)";
										}
									},
								},
								position: "right",
								beginAtZero: true,
							},
						},
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
					data={{
						labels: Object.keys(data).map((key) => {
							let label = key.split(" ");
							return label[1] + " " + label[2];
						}),
						datasets: [
							{
								data: Object.keys(data).map((key) => data[key]),
								borderRadius: 100,
								backgroundColor: (ctx, options) => {
									if (ctx.raw === 0) {
										return "rgb(191,219,254)";
									} else {
										return "rgb(248,113,113)";
									}
								},
								minBarLength: 5,
							},
						],
					}}
				/>
			</div>
			<div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 py-3 px-2 rounded-md mt-16">
				<div className="flex items-center gap-5 ">
					<div className="h-9 w-9 bg-yellow-200 rounded-full grid place-content-center">
						<HiOutlineArrowTrendingUp className="w-6 h-6 text-gray-500 dark:text-gray-400" />
					</div>
					<div>
						<h1 className="font-semibold">Highest Spent</h1>
						<p className="text-sm text-gray-500">{highSpent}</p>
					</div>
				</div>
				<h1 className="text-lg text-red-400">-{data[highSpent]}$</h1>
			</div>
		</>
	);
}

type data = {
	[key: string]: number;
};
const generateData = (
	expenses: IExpense[],
	month = dayjs().month(),
	year = dayjs().year()
) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

	const listOfDates: data = {};
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		const dateString = firstDateOfMonth.date(i).toDate().toDateString();
		listOfDates[dateString] = 0;
	}
	expenses.forEach(function (val) {
		const expenseDate = dayjs(val.created_at).toDate().toDateString();

		if (expenseDate in listOfDates) {
			listOfDates[expenseDate] += val.amount;
		}
	});
	return listOfDates;
};
