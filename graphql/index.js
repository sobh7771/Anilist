const { GraphQLClient } = require("graphql-request");
const { gql } = require("graphql-request");

const client = new GraphQLClient("https://graphql.anilist.co/");

const HomeQuery = gql`
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
		format
		status(version: 2)
		episodes
		genres
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

const GetMedia = gql`
	query media($id: Int, $type: MediaType) {
		Media(id: $id, type: $type) {
			title {
				userPreferred
				romaji
				english
				native
			}
			coverImage {
				large
			}
			bannerImage
			startDate {
				year
				month
				day
			}
			description
			season
			seasonYear
			format
			status(version: 2)
			episodes
			duration
			genres
			synonyms
			source(version: 3)
			meanScore
			averageScore
			popularity
			favourites
			hashtag
			nextAiringEpisode {
				airingAt
				timeUntilAiring
				episode
			}
			studios {
				edges {
					node {
						id
						name
					}
				}
			}
			staff {
				edges {
					node {
						id
						name {
							userPreferred
						}
					}
				}
			}
			externalLinks {
				site
				url
			}
			rankings {
				rank
				context
			}
			tags {
				id
				name
				description
				rank
				isMediaSpoiler
			}
		}
	}
`;

export const getHomeQuery = (vars) => client.request(HomeQuery, vars);
export const getMedia = ({ id, type }) =>
	client.request(GetMedia, { id, type });
