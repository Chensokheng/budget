import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	// Create a new supabase browser client on every first render.
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	const queryClient = new QueryClient();

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />

				<Toaster />
			</QueryClientProvider>
		</SessionContextProvider>
	);
}
