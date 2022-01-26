import GlobalStyle from "@/components/GlobalStyle";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true), []);

	return (
		<QueryClientProvider client={client}>
			<div className={isBrowser && "preload"}>
				<Component {...pageProps} />
			</div>
			<GlobalStyle />
		</QueryClientProvider>
	);
}

export default MyApp;

/**
 * Testing area
 */
