import Link from "next/link";
import React from "react";
import SiteLayout from "../components/SiteLayout";
import { IoReturnUpBack } from "react-icons/io5";
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
					<div className="flex flex-col gap-3 hover:bg-gray-100 py-3 px-2">
						<p className="text-sm text-gray-500 border-l-2 pl-5">
							{new Date().toDateString()}
						</p>
						<div className=" border-yellow-600 flex flex-col gap-2">
							<div className="flex flex-col gap-1">
								<li>
									Logs page to keep track what has been done
									and what is coming for next version.
								</li>
								<li>
									Fix list expenses not reading from the
									cache.
								</li>
								<li>Fix parse date time on phone.</li>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-3 hover:bg-gray-100 py-3 px-2">
						<p className="text-sm text-gray-500 border-l-2 pl-5">
							{new Date(
								new Date().setDate(new Date().getDate() - 1)
							).toDateString()}
						</p>
						<div className=" border-yellow-600 flex flex-col gap-2">
							<div className="flex flex-col gap-1">
								<li>
									publish this web app to
									https://dailyexpense.vercel.app.
								</li>
								<li>
									User can add expenses,tags,list expenses.
								</li>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SiteLayout>
	);
}
