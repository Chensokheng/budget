import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import Redirect from "../components/Redirect";
import SiteLayout from "../components/SiteLayout";

export default function Auth() {
	const supabaseClient = useSupabaseClient();

	const user = useUser();
	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<SiteLayout>
			<div className="w-full flex flex-col gap-5">
				<h1 className="text-center text-2xl font-bold">
					Welcome to DailyExpense
				</h1>
				<p className="text-center text-gray-500">
					Continue with Google
				</p>
				<button
					className="mx-auto hover:ring-2 ring-1 py-2 rounded-sm ring-zinc-600 flex items-center gap-3 px-4 group"
					onClick={() => {
						supabaseClient.auth.signInWithOAuth({
							provider: "google",
						});
					}}
				>
					<FcGoogle className="h-8 w-8" />
					<span className="flex-1 group-hover:tracking-wider transition-all">
						Login with Google
					</span>
				</button>
			</div>
		</SiteLayout>
	);
}
