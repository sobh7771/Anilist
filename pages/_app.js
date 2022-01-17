import GlobalStyle from "@/components/GlobalStyle";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		document.querySelector(".preload").removeAttribute("class");
	}, []);
	return (
		<QueryClientProvider client={client}>
			<Component {...pageProps} />
			<GlobalStyle />
		</QueryClientProvider>
	);
}

export default MyApp;

/**
 * Testing area
 */
