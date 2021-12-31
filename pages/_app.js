import GlobalStyle from "@/components/GlobalStyle";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<GlobalStyle />
		</>
	);
}

export default MyApp;
