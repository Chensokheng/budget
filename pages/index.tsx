import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";
import TotalExpense from "../components/TotalExpense";
import ListOfExpense from "../components/ListOfExpense";
import SiteLayout from "../components/SiteLayout";
import AddExpense from "../components/AddExpense";
import BottomNavigation from "../components/BottomNavigation";
import { useQueryClient } from "@tanstack/react-query";
import useIsAddExpense from "../hook/useIsAddExpense";

export default function Home() {
	const queryClient = useQueryClient();
	const { data } = useIsAddExpense();
	const user = useUser();
	if (!user) {
		return <Redirect to="/auth" />;
	}
	const handleOpen = () => {
		queryClient.setQueryData(["state"], !data);
	};
	return (
		<SiteLayout>
			<AddExpense isOpen={data} close={handleOpen} />
			<div className="w-full">
				<TotalExpense />
				<ListOfExpense />
			</div>
			<BottomNavigation addExpense={handleOpen} />
		</SiteLayout>
	);
}
