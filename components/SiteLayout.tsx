import { useRouter } from "next/router";
import React from "react";
import useAppState from "../hook/useAppState";
import cn from "../utils/cn";
import BottomNavigation from "./BottomNavigation";
import Navigation from "./Navigation";
export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data } = useAppState();
	const router = useRouter();
	const isAuthPage = router.pathname === "/auth";
	return (
		<div
			className={cn(
				"bg-gray-50 dark:bg-gray-900 min-h-screen relative",
				isAuthPage || data?.isAddingExpense
					? "overflow-hidden h-screen"
					: ""
			)}
		>
			{!isAuthPage && <Navigation />}
			<div className="sm:max-w-lg mx-auto bg-white dark:bg-black px-5 flex justify-center items-center relative min-h-screen ">
				{children}
				{!isAuthPage && <BottomNavigation />}
			</div>
		</div>
	);
}
