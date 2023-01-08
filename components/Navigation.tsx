import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineMoon, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
export default function Navigation() {
	const supabase = useSupabaseClient();
	const router = useRouter();

	return (
		<nav className="p-5 flex justify-between bg-white pt-12 sm:max-w-lg mx-auto">
			<HiOutlineMoon className="h-5 w-5 hover:scale-110 transition-all" />
			<h1 className="font-bold uppercase">
				{router.pathname.split("/")[1] || "Expenses"}
			</h1>
			<HiOutlineArrowRightOnRectangle
				className="h-5 w-5 hover:scale-110 transition-all"
				onClick={async () => await supabase.auth.signOut()}
			/>
		</nav>
	);
}
