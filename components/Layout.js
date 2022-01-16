import Head from "next/head";
import Header from "./Header";

function Layout({ title, children, background }) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header background={background} />
			{children}
		</>
	);
}

Layout.defaultProps = {
	title: "Anilist: Track, Discover, Share Anime & Manga",
};

export default Layout;
