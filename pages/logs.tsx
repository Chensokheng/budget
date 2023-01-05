import Link from "next/link";
import React from "react";
import SiteLayout from "../components/SiteLayout";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { BsInfo } from "react-icons/bs";
import logs from "../static/logs";

export default function Logs() {
	return (
		<SiteLayout>
			<div className="min-h-screen w-full">
				<div className="border-b">
					<Link href="/">
						<IoReturnUpBack className="h-8 w-8 hover:scale-110 transition-all" />
					</Link>
				</div>
				<h1 className="font-black text-3xl pb-8 pt-8">Update Logs</h1>

				<div className="flex flex-col gap-5">
					{Object.keys(logs).map((date, index) => {
						return (
							<div
								className="flex flex-col gap-3 hover:bg-gray-100 py-3 px-2"
								key={index}
							>
								<p className="text-sm text-gray-500 border-l-2 pl-5">
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
				</div>
			</div>
			<div className="fixed bottom-0  w-lg h-14 grid grid-cols-2 bg-white px-8 sm:px-0 pb-9">
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<Link href="/">
						<HiOutlineHome className="h-8 w-8 group-hover:scale-125 transition-all" />
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
