import Layout from "@/components/Layout";
import Filters from "@/components/Filters";
import InfiniteMediaCards from "@/components/InfiniteMediaCards";
import { useState } from "react";
import { useRouter } from "next/router";
import helpers from "helpers";

const d = new Date();
const season = helpers.getSeason(helpers.getMonth(d.getMonth()));
const year = d.getFullYear();

const config = {
	anime: {
		trending: {
			headline: "Trending Anime",
			filters: {
				sort: ["TRENDING_DESC", "POPULARITY_DESC"],
			},
		},
		"top-100": {
			headline: "Top 100 Anime",
			filters: { sort: ["SCORE_DESC"] },
		},
		"top-movies": {
			headline: "Top Anime Movies",
			filters: { sort: ["SCORE_DESC"], format: ["MOVIE"] },
		},
		"this-season": {
			headline: `${season} ${year} Anime`,
			filters: {
				seasonYear: year,
				season: season.toUpperCase(),
			},
		},
		"next-season": {
			headline: `Anime Next Season - Airing ${helpers.getNextSeason(
				season
			)} ${year}`,
			filters: {
				seasonYear: year,
				season: helpers.getNextSeason(season).toUpperCase(),
			},
		},
		popular: {
			headline: "All-Time Popular Anime",
			filters: {
				sort: ["POPULARITY_DESC"],
			},
		},
	},
	manga: {
		"top-100": {
			headline: "Top 100 Manga",
			filters: {
				sort: ["SCORE_DESC"],
			},
		},
		trending: {
			headline: "Trending Manga",
			filters: {
				sort: ["TRENDING_DESC", "POPULARITY_DESC"],
			},
		},
		"top-manhwa": {
			headline: "Top Manhwa",
			filters: {
				sort: ["SCORE_DESC"],
				countryOfOrigin: "KR",
			},
		},
	},
};

function SearchMedia() {
	const [view, setView] = useState("small");
	const router = useRouter();
	const [type, sub_route] = router.query.slug;
	const headline = config[type][sub_route]?.headline || "";
	const filters = config[type][sub_route]?.filters || {};

	return (
		<Layout title={headline || `Search ${helpers.capitalize(type)}`}>
			<div
				css={`
					padding-top: 11.6rem;
				`}>
				<div className="container">
					{sub_route && (
						<h1
							css={`
								font-size: 2.8rem;
								color: rgb(100, 115, 128);
								font-weight: 800;
								padding-bottom: 3rem;
								font-family: Overpass;
							`}>
							{headline}
						</h1>
					)}
					<Filters
						handleClick={(view) => {
							setView(view);
						}}
						view={view}
						mediaType="MANGA"
					/>
					<InfiniteMediaCards
						view={view}
						filters={{
							type: type.toUpperCase(),
							...filters,
						}}
					/>
				</div>
			</div>
		</Layout>
	);
}

export default SearchMedia;

export const getStaticPaths = () => {
	return {
		paths: [
			{ params: { slug: ["anime"] } },
			{ params: { slug: ["anime", "trending"] } },
			{ params: { slug: ["anime", "top-100"] } },
			{ params: { slug: ["anime", "this-season"] } },
			{ params: { slug: ["anime", "next-season"] } },
			{ params: { slug: ["anime", "popular"] } },
			{ params: { slug: ["anime", "top-movies"] } },
			{ params: { slug: ["manga"] } },
			{ params: { slug: ["manga", "trending"] } },
			{ params: { slug: ["manga", "top-100"] } },
			{ params: { slug: ["manga", "top-manhwa"] } },
		],
		fallback: false,
	};
};

export const getStaticProps = () => {
	return {
		props: {},
	};
};
