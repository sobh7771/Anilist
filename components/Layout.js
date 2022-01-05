import Head from "next/head";
import Header from "./Header";

function Layout({ title, children, headerBackground }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500&family=Roboto:wght@400;500&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Header headerBackground={headerBackground} />
			{children}
		</>
	);
}

Layout.defaultProps = {
	title: "Anilist: Track, Discover, Share Anime & Manga",
};

export default Layout;
