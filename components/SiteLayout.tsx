import React from "react";
import useAppState from "../hook/useAppState";
import BottomNavigation from "./BottomNavigation";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useAppState();
	return (
		<div className="bg-gray-50 min-h-screen relative">
			<div className="sm:max-w-lg mx-auto bg-white px-5 flex justify-center items-center relative min-h-screen ">
				{children}
				<BottomNavigation />
			</div>
		</div>
	);
}
