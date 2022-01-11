import Layout from "@/components/Layout";
import Filters from "@/components/Filters";
import InfiniteMediaCards from "@/components/InfiniteMediaCards";
import { useState } from "react";

function SearchPage() {
	const [view, setView] = useState("small");

	return (
		<Layout title="Search Anime">
			<div
				css={`
					padding-top: 11.6rem;
				`}>
				<div className="container">
					<Filters
						handleClick={(view) => {
							setView(view);
						}}
						view={view}
						mediaType="MANGA"
					/>
					<InfiniteMediaCards view={view} mediaType="MANGA" />
				</div>
			</div>
		</Layout>
	);
}

export default SearchPage;
