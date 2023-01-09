import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React from "react";
import {
	HiOutlineMoon,
	HiOutlineArrowRightOnRectangle,
	HiOutlineSun,
} from "react-icons/hi2";
export default function Navigation() {
	const supabase = useSupabaseClient();
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	return (
		<nav className="p-5 flex justify-between bg-white dark:bg-black pt-12 sm:max-w-lg mx-auto">
			{theme === "light" ? (
				<HiOutlineMoon
					className="h-5 w-5 hover:scale-110 transition-all"
					onClick={() => {
						setTheme("dark");
					}}
				/>
			) : (
				<HiOutlineSun
					className="h-5 w-5 hover:scale-110 transition-all"
					onClick={() => {
						setTheme("light");
					}}
				/>
			)}

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
