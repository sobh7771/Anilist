import { gql, request } from "graphql-request";
import Layout from "@/components/Layout";
import { API_URL } from "config";
import helpers from "helpers";
import WelcomeSection from "@/components/WelcomeSection";

export default function WelcomePage({ data }) {
	return (
		<Layout>
			<div css="height:68px" />
			<div className="container">
				<div
					css={`
						margin-top: 5rem;
						.welcome-section:not(:last-child) {
							margin-bottom: 5rem;
						}
					`}>
					<WelcomeSection
						link="/search/anime/trending"
						headline="trending now"
						mediaCards={data.trending.media}
					/>
					<WelcomeSection
						link="/search/anime/this-season"
						headline="Popular this season"
						mediaCards={data.season.media}
					/>
					<WelcomeSection
						link="/search/anime/next-season"
						headline="Upcoming next season"
						mediaCards={data.nextSeason.media}
					/>
					<WelcomeSection
						link="/search/anime/popular"
						headline="All time popular"
						mediaCards={data.popular.media}
					/>
					<WelcomeSection
						link="/search/anime/top-100"
						headline="Top 100 anime"
						mediaCards={data.top.media}
						view="list"
						isRanked
					/>
				</div>
			</div>
		</Layout>
	);
}

const GetWelcome = gql`
	query (
		$season: MediaSeason
		$seasonYear: Int
		$nextSeason: MediaSeason
		$nextYear: Int
	) {
		trending: Page(page: 1, perPage: 5) {
			media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
				...media
			}
		}
		season: Page(page: 1, perPage: 5) {
			media(
				season: $season
				seasonYear: $seasonYear
				sort: POPULARITY_DESC
				type: ANIME
				isAdult: false
			) {
				...media
			}
		}
		nextSeason: Page(page: 1, perPage: 5) {
			media(
				season: $nextSeason
				seasonYear: $nextYear
				sort: POPULARITY_DESC
				type: ANIME
				isAdult: false
			) {
				...media
			}
		}
		popular: Page(page: 1, perPage: 5) {
			media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
				...media
			}
		}
		top: Page(page: 1, perPage: 10) {
			media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
				...media
			}
		}
	}

	fragment media on Media {
		id
		title {
			userPreferred
		}
		coverImage {
			large
			color
		}
		startDate {
			year
			month
			day
		}
		type
		format
		status(version: 2)
		episodes
		genres
		season
		description
		averageScore
		popularity
		nextAiringEpisode {
			airingAt
			timeUntilAiring
			episode
		}
		studios(isMain: true) {
			edges {
				isMain
				node {
					id
					name
				}
			}
		}
	}
`;

const getWelcome = (vars) => request(API_URL, GetWelcome, vars);

export const getStaticProps = async () => {
	const d = new Date();
	const season = helpers.getSeason(helpers.getMonth(d.getMonth()));
	const year = d.getFullYear();

	const vars = {
		seasonYear: year,
		nextYear: year,
		season: season.toUpperCase(),
		nextSeason: helpers.getNextSeason(season).toUpperCase(),
	};

	const data = await getWelcome(vars);

	return {
		props: {
			data,
		},
	};
};
