import React from "react";
import Link from "next/link";
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
import { FiPieChart } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BsInfo } from "react-icons/bs";
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
			<div className="min-h-screen w-full py-10 flex flex-col gap-10 ">
				<div className="bg-yellow-100 py-3 px-2 rounded-md">
					<h1 className="tex-sm">
						ℹ️ This is not your data. We are still working on it.
						<Link
							href={"/logs"}
							className="text-blue-600 underline"
						>
							{" Visit our log to keep update"}
						</Link>
						.
					</h1>
				</div>
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
				</div>
				{/* bar chart */}
				<div className="w-full mt-10 divide-y flex flex-col gap-5 pb-10">
					<div className="flex w-full items-center gap-10">
						<span className="text-4xl">🥑</span>
						<div className="flex items-center justify-between flex-1">
							<div>
								<h1 className="text-lg font-semibold">
									Groceries
								</h1>
								<p className="text-gray-500">5 entries</p>
							</div>
							<h1 className=" font-semibold text-lg">$228.50</h1>
						</div>
					</div>
					<div className="flex w-full items-center gap-10 pt-5">
						<span className="text-4xl">📚</span>
						<div className="flex items-center justify-between flex-1">
							<div>
								<h1 className="text-lg font-semibold">
									Education
								</h1>
								<p className="text-gray-500">3 entries</p>
							</div>
							<h1 className=" font-semibold text-lg">$100</h1>
						</div>
					</div>
					<div className="flex w-full items-center gap-10 pt-5">
						<span className="text-4xl">⛱</span>
						<div className="flex items-center justify-between flex-1">
							<div>
								<h1 className="text-lg font-semibold">
									Vacation
								</h1>
								<p className="text-gray-500">2 entries</p>
							</div>
							<h1 className=" font-semibold text-lg">$553.76</h1>
						</div>
					</div>
					<div className="flex w-full items-center gap-10 pt-5">
						<span className="text-4xl">💊</span>
						<div className="flex items-center justify-between flex-1">
							<div>
								<h1 className="text-lg font-semibold">
									Health
								</h1>
								<p className="text-gray-500">3 entries</p>
							</div>
							<h1 className=" font-semibold text-lg">$24.6</h1>
						</div>
					</div>
					<div className="flex w-full items-center gap-10 pt-5">
						<span className="text-4xl">🎁</span>
						<div className="flex items-center justify-between flex-1">
							<div>
								<h1 className="text-lg font-semibold">Gift</h1>
								<p className="text-gray-500">5 entries</p>
							</div>
							<h1 className=" font-semibold text-lg">$50</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0  w-lg h-14 grid grid-cols-3 bg-white px-8 sm:px-0 pb-9">
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<Link href="/summary">
						<FiPieChart className="h-8 w-8 group-hover:scale-125 transition-all" />
					</Link>
				</div>
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<Link href="/">
						<CgAddR className="h-8 w-8 hover:scale-125 transition-all" />
					</Link>
				</div>
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<Link href="/logs">
						<BsInfo className="h-8 w-8 group-hover:scale-125 transition-all" />
					</Link>
				</div>
			</div>
		</SiteLayout>
	);
}
