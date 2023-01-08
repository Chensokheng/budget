import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import Redirect from "../components/Redirect";
import Image from "next/image";
import cn from "../utils/cn";
import { GetServerSidePropsContext } from "next";

export default function Auth() {
	const supabaseClient = useSupabaseClient();
	const [isLoading, setLoading] = useState(true);
	const user = useUser();
	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="w-full flex flex-col gap-10 h-screen pt-10 p-5 overflow-hidden">
			{" "}
			<div className="flex flex-col gap-10">
				<div className="flex items-center gap-10">
					<Image
						src="/icon-192x192.png"
						alt=""
						width={80}
						height={80}
						className={cn(
							" object-center  object-cover bg0",
							isLoading
								? " blur-2xl grayscale"
								: "blur-0 grayscale-0"
						)}
						onLoadingComplete={() => setLoading(false)}
					/>
					<h1 className=" font-black text-4xl">Daily Budget</h1>
				</div>
				<div>
					<h1 className="text-3xl font-semibold">
						Track and analyze your expense today.
					</h1>
					<p className="mt-5 text-gray-500">
						offer away to keep track of your financial expenses in a
						convenient and organized way. It typically allows you to
						input information about your expenses and provides tools
						for analyzing and categorizing this information to help
						you better understand your spending habits.
					</p>
				</div>
				<button
					className="mx-auto w-full hover:ring-2 ring-1 py-2 rounded-sm ring-zinc-600 flex items-center gap-3 px-4 group"
					onClick={() => {
						supabaseClient.auth.signInWithOAuth({
							provider: "google",
						});
					}}
				>
					<FcGoogle className="h-8 w-8" />
					<span className="flex-1 group-hover:tracking-wider transition-all">
						Login to continue
					</span>
				</button>
			</div>
			<div className="flex justify-center items-center">
				<Image
					src="/auth/landing.png"
					alt="demo"
					width={450}
					height={400}
					className={cn(
						" object-center  object-cover bg0",
						isLoading ? " blur-2xl grayscale" : "blur-0 grayscale-0"
					)}
					onLoadingComplete={() => setLoading(false)}
				/>
			</div>
		</div>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};

	return {
		props: {},
	};
};
