import Head from "next/head";

function Layout({ title, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			{children}
		</>
	);
}

Layout.defaultProps = {
	title: "Anilist: Track, Discover, Share Anime & Manga",
};

export default Layout;
