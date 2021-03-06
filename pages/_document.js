import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Overpass:wght@500;600;700;800&family=Roboto:wght@400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<div id="progress-bar"></div>
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
