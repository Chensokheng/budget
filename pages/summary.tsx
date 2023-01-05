import React from "react";
import SiteLayout from "../components/SiteLayout";
import { BiUpArrowAlt } from "react-icons/bi";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function Summary() {
	return (
		<SiteLayout>
			<div className="min-h-screen w-full pt-16">
				<div>
					<h1 className="text-5xl font-semibold mb-2">$803.92</h1>
					<div className="flex gap-2 items-center">
						<span className="text-gray-500">
							Total spent this month
						</span>
						<div className="flex items-center gap-2">
							<div className="h-5 w-5 rounded-full bg-red-200 grid place-content-center">
								<BiUpArrowAlt className="text-red-500" />
							</div>
							<span className=" text-red-500">1%</span>
						</div>
					</div>
				</div>
				{/* bar chart */}
				<div className="mt-10 w-full h-64">
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
							// responsive: true,
							plugins: {
								legend: {
									display: false,
								},
							},
						}}
						data={{
							labels: [
								...Array.from({ length: 31 }, () =>
									Math.floor(Math.random() * 100)
								),
								20,
							],
							datasets: [
								{
									data: [
										...Array.from({ length: 31 }, () =>
											Math.floor(Math.random() * 150)
										),
									],
									borderRadius: 100,
									backgroundColor: (ctx, options) => {
										if (ctx.raw === 0) {
											return "rgb(191,219,254)";
										} else {
											// return "rgb(251,112,133)";
											return "rgb(0,0,0)";
										}
									},
									minBarLength: 5,
								},
							],
						}}
					/>
				</div>{" "}
				{/* bar chart */}
			</div>
		</SiteLayout>
	);
}
