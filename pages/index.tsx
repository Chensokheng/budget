import React, { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Redirect from "../components/Redirect";
import TotalExpense from "../components/TotalExpense";
import ListOfExpense from "../components/ListOfExpense";
import SiteLayout from "../components/SiteLayout";
import AddExpense from "../components/AddExpense";
import BottomNavigation from "../components/BottomNavigation";
import moment from "moment";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const user = useUser();
	if (!user) {
		return <Redirect to="/auth" />;
	}

	return (
		<SiteLayout>
			<AddExpense isOpen={isOpen} close={() => setIsOpen(!isOpen)} />
			<div className="w-full">
				<TotalExpense />
				<ListOfExpense />
			</div>
			<BottomNavigation addExpense={() => setIsOpen(true)} />
		</SiteLayout>
	);
}
