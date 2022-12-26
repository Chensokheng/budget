import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { User } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useRef, useState } from "react";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Redirect from "../components/Redirect";
import TotalExpense from "../components/TotalExpense";
import ListOfExpense from "../components/ListOfExpense";
import SiteLayout from "../components/SiteLayout";
import useCustomUser from "../hook/useCustomUser";
import AddExpense from "../components/AddExpense";
import useExpenses from "../hook/useExpenses";

export default function Home() {
	const supabaseClient = useSupabaseClient();
	const [isOpen, setIsOpen] = useState(false);
	const user = useUser();
	if (!user) {
		return <Redirect to="/auth" />;
	}

	return (
		<SiteLayout>
			<div
				className=" absolute top-5 right-5 w-10 h-10 bg-black rounded-full text-white grid place-content-center hover:scale-110 transition-all cursor-pointer text-xl group select-none outline-none"
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<span className="group-hover:scale-110 select-none outline-none">
					+
				</span>
			</div>
			<AddExpense isOpen={isOpen} close={() => setIsOpen(!isOpen)} />
			<div className="w-full">
				<TotalExpense />
				<ListOfExpense />
			</div>
		</SiteLayout>
	);
}
