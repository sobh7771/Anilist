import GlobalStyle from "@/components/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={client}>
			<Component {...pageProps} />
			<GlobalStyle />
		</QueryClientProvider>
	);
}

export default MyApp;
