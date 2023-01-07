import React, { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";
import TotalExpense from "../components/TotalExpense";
import ListOfExpense from "../components/ListOfExpense";
const AddExpense = dynamic(() => import("../components/AddExpense"));
import BottomNavigation from "../components/BottomNavigation";
import dynamic from "next/dynamic";
import cn from "../utils/cn";
import Head from "next/head";

export default function Home() {
	const user = useUser();
	const [isAdding, setAdding] = useState(false);
	if (!user) {
		return <Redirect to="/auth" />;
	}
	return (
		<>
			<div className="bg-gray-50 min-h-screen relative">
				<div
					className={cn(
						"sm:max-w-lg mx-auto bg-white px-5 flex justify-center items-center relative",
						isAdding ? "overflow-hidden h-screen" : "min-h-screen"
					)}
				>
					<AddExpense
						isOpen={isAdding}
						close={() => {
							setAdding(false);
						}}
					/>
					<div className="w-full">
						<TotalExpense />
						<ListOfExpense />
					</div>
					<BottomNavigation addExpense={() => setAdding(true)} />
				</div>
			</div>
		</>
	);
}
