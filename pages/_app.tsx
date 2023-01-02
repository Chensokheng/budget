import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

import { Nunito } from "@next/font/google";

const nunito = Nunito();

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	const queryClient = new QueryClient();

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<QueryClientProvider client={queryClient}>
				<main className={nunito.className}>
					<Component {...pageProps} />
				</main>
				<ReactQueryDevtools initialIsOpen={false} />

				<Toaster />
			</QueryClientProvider>
		</SessionContextProvider>
	);
}
