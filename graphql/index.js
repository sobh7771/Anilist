const { GraphQLClient } = require("graphql-request");
const { gql } = require("graphql-request");

const client = new GraphQLClient("https://graphql.anilist.co/");

console.log(client);

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
			id
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
			endDate {
				year
				month
				day
			}
			description
			season
			seasonYear
			type
			format
			status(version: 2)
			episodes
			duration
			chapters
			volumes
			genres
			synonyms
			source(version: 3)
			isAdult
			isLocked
			meanScore
			averageScore
			popularity
			favourites
			hashtag
			countryOfOrigin
			isLicensed
			isFavourite
			isRecommendationBlocked
			isFavouriteBlocked
			nextAiringEpisode {
				airingAt
				timeUntilAiring
				episode
			}
			studios {
				edges {
					isMain
					node {
						id
						name
					}
				}
			}

			staff {
				edges {
					id
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
			streamingEpisodes {
				site
				title
				thumbnail
				url
			}
			rankings {
				id
				rank
				type
				format
				year
				season
				allTime
				context
			}
			tags {
				id
				name
				description
				rank
				isMediaSpoiler
				isGeneralSpoiler
				userId
			}
		}
	}
`;

export const getHomeQuery = (vars) => client.request(HomeQuery, vars);
export const getMedia = ({ id, type }) =>
	client.request(GetMedia, { id, type });
