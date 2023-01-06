import React from "react";
import useIsAddExpense from "../hook/useIsAddExpense";
import cn from "../utils/cn";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: isAdding } = useIsAddExpense();

	return (
		<div className="bg-gray-50 min-h-screen relative">
			<div
				className={cn(
					"sm:max-w-lg mx-auto bg-white px-5 flex justify-center items-center relative",
					isAdding ? "h-screen overflow-hidden" : "min-h-screen "
				)}
			>
				{children}
			</div>
		</div>
	);
}
