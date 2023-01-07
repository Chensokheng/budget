import React from "react";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-50 min-h-screen relative">
			<div className="sm:max-w-lg mx-auto bg-white px-5 flex justify-center items-center relative min-h-screen ">
				{children}
			</div>
		</div>
	);
}
