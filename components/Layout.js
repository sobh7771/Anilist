import Head from "next/head";
import Header from "./Header";

function Layout({ title, children, headerBackground }) {
	return (
		<>
			<Head>
				<title>{title}</title>
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
