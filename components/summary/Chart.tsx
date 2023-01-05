import React from "react";
import dayjs from "dayjs";

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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function Chart({ expenses }: { expenses: any }) {
	const amounts = [...expenses];
	return (
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
					labels: generateDate().map((_, index) => index + 1),
					datasets: [
						{
							data: amounts
								.reverse()
								.map((spent: any) => spent.amount),
							borderRadius: 100,
							backgroundColor: (ctx, options) => {
								if (ctx.raw === 0) {
									return "rgb(191,219,254)";
								} else {
									return "rgb(0,0,0)";
								}
							},
							minBarLength: 5,
						},
					],
				}}
			/>
		</div>
	);
}

const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

	const arrayOfDate = [];
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push(firstDateOfMonth.date(i));
	}
	return arrayOfDate;
};
