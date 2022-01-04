const { gql } = require("graphql-request");

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

const GetOverview = gql`
	query media($id: Int, $type: MediaType, $isAdult: Boolean) {
		Media(id: $id, type: $type, isAdult: $isAdult) {
			relations {
				edges {
					id
					relationType(version: 2)
					node {
						id
						title {
							userPreferred
						}
						format
						type
						status(version: 2)
						coverImage {
							large
						}
					}
				}
			}
			characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
				edges {
					id
					role
					name
					voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
						id
						name {
							userPreferred
						}
						language: languageV2
						image {
							large
						}
					}
					node {
						id
						name {
							userPreferred
						}
						image {
							large
						}
					}
				}
			}
			staffPreview: staff(perPage: 4, sort: [RELEVANCE, ID]) {
				edges {
					id
					role
					node {
						id
						name {
							userPreferred
						}
						language: languageV2
						image {
							large
						}
					}
				}
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
			reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {
				pageInfo {
					total
				}
				nodes {
					id
					summary
					rating
					ratingAmount
					user {
						id
						name
						avatar {
							large
						}
					}
				}
			}
			recommendations(perPage: 5, sort: [RATING_DESC, ID]) {
				pageInfo {
					total
				}
				nodes {
					id
					rating
					userRating
					mediaRecommendation {
						id
						title {
							userPreferred
						}
						format
						type
						status(version: 2)
						coverImage {
							large
						}
					}
				}
			}
			trailer {
				id
				site
			}
			stats {
				statusDistribution {
					status
					amount
				}
				scoreDistribution {
					score
					amount
				}
			}
		}
	}
`;

const GetCharacters = gql`
	query media($id: Int, $type: MediaType, $page: Int) {
		Media(id: $id, type: $type) {
			characterPreview: characters(
				page: $page
				perPage: 6
				sort: [ROLE, RELEVANCE, ID]
			) {
				pageInfo {
					lastPage
					currentPage
				}
				edges {
					id
					role
					name
					voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
						id
						name {
							userPreferred
						}
						language: languageV2
						image {
							large
						}
					}
					node {
						id
						name {
							userPreferred
						}
						image {
							large
						}
					}
				}
			}
		}
	}
`;

const GetThreads = gql`
	query ($id: Int, $page: Int, $perPage: Int = 2) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			threads(mediaCategoryId: $id, sort: ID_DESC) {
				id
				title
				replyCount
				viewCount
				replyCommentId
				repliedAt
				createdAt
				categories {
					id
					name
				}
				user {
					id
					name
					avatar {
						large
					}
				}
				replyUser {
					id
					name
					avatar {
						large
					}
				}
			}
		}
	}
`;

const GetStaff = gql`
	query media($id: Int, $type: MediaType, $page: Int, $perPage: Int = 5) {
		Media(id: $id, type: $type) {
			staff(page: $page, perPage: $perPage) {
				edges {
					id
					role
					node {
						id
						name {
							userPreferred
						}
						image {
							large
						}
					}
				}
				pageInfo {
					lastPage
					currentPage
				}
			}
		}
	}
`;

export {
	GetOverview,
	GetCharacters,
	HomeQuery,
	GetMedia,
	GetThreads,
	GetStaff,
};