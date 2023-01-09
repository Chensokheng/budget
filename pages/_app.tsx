import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
	SessionContextProvider,
	Session,
	SupabaseClient,
} from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Nunito } from "@next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SE0 from "../components/SEO";
import { Database } from "../type/schema";
import SiteLayout from "../components/SiteLayout";
import { ThemeProvider } from "next-themes";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	const [queryClient] = React.useState(function () {
		return new QueryClient();
	});

	return (
		<>
			<SE0 />

			<SessionContextProvider
				supabaseClient={
					supabaseClient as SupabaseClient<Database, "public", any>
				}
				initialSession={pageProps.initialSession}
			>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider attribute="class" defaultTheme="light">
						<main className={nunito.className}>
							<SiteLayout>
								<Component {...pageProps} />{" "}
							</SiteLayout>
						</main>
					</ThemeProvider>

					<ReactQueryDevtools />
				</QueryClientProvider>
			</SessionContextProvider>
		</>
	);
}
