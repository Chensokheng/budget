import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import Redirect from "../components/Redirect";

export default function Auth() {
	const supabaseClient = useSupabaseClient();

	const user = useUser();
	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<button
				onClick={async () => {
					await supabaseClient.auth.signInWithOAuth({
						provider: "github",
					});
				}}
			>
				Login with github
			</button>
		</div>
	);
}

// import React from "react";

// export default function auth() {
// 	return <div>auth</div>;
// }
