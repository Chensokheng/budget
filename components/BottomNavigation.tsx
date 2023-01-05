import React from "react";
import { CgAddR } from "react-icons/cg";
import { BsInfo } from "react-icons/bs";
import Link from "next/link";

export default function BottomNavigation({
	addExpense,
}: {
	addExpense: () => void;
}) {
	return (
		<div className="fixed bottom-0  w-lg h-14 grid grid-cols-2 bg-white px-8 sm:px-0 pb-9">
			<div
				className="flex justify-center items-center flex-col group cursor-pointer"
				onClick={addExpense}
			>
				<CgAddR className="h-8 w-8 hover:scale-125 transition-all" />
			</div>
			<div className="flex justify-center items-center flex-col group cursor-pointer">
				<Link href="/logs">
					<BsInfo className="h-8 w-8 group-hover:scale-125 transition-all" />
				</Link>
			</div>
		</div>
	);
}
