import GlobalStyle from "@/components/GlobalStyle";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<GlobalStyle />
		</>
	);
}

export default MyApp;
