import Link from "next/link";
import React from "react";
import SiteLayout from "../components/SiteLayout";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { BsInfo } from "react-icons/bs";
import logs from "../static/logs";
import nextUpdate from "../static/nextupdate";

export default function Logs() {
	return (
		<div className="min-h-screen w-full pt-10 pb-20 dark:text-slate-100">
			<div className="border-b">
				<Link href="/">
					<IoReturnUpBack className="h-8 w-8 hover:scale-110 transition-all" />
				</Link>
			</div>
			<div id="next-update">
				<h1 className="font-black text-3xl pb-8 pt-8">Next update</h1>
				{nextUpdate.map((update, index) => {
					return <li key={index}>{update}</li>;
				})}
			</div>
			<div>
				<h1 className="font-black text-3xl pb-8 pt-8">Updated Logs</h1>
				<div className="flex flex-col gap-5">
					{Object.keys(logs).map((date, index) => {
						return (
							<div
								className="flex flex-col gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 py-3 px-2"
								key={index}
							>
								<p className="text-sm text-gray-500 dark:text-gray-400 border-l-2 pl-5">
									{date}
								</p>
								<div className=" border-yellow-600 flex flex-col gap-2">
									<div className="flex flex-col gap-1">
										{logs[date].map(
											(log: string, key: number) => {
												return <li key={key}>{log}</li>;
											}
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>{" "}
			</div>
		</div>
	);
}
