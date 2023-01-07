import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import {
	QueryClient,
	QueryClientProvider,
	Hydrate,
} from "@tanstack/react-query";

import { Nunito } from "@next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SE0 from "../components/SEO";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
	dehydratedState: any;
}>) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	const [queryClient] = React.useState(function () {
		return new QueryClient();
	});

	return (
		<>
			<SE0 />

			<SessionContextProvider
				supabaseClient={supabaseClient}
				initialSession={pageProps.initialSession}
			>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<main className={nunito.className}>
							<Component {...pageProps} />
						</main>
					</Hydrate>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</SessionContextProvider>
		</>
	);
}
