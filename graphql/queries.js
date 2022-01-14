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

const GetGenres = gql`
	{
		genres: GenreCollection
	}
`;

const Search = gql`
	query (
		$page: Int = 1
		$id: Int
		$type: MediaType
		$isAdult: Boolean = false
		$search: String
		$format: [MediaFormat]
		$status: MediaStatus
		$countryOfOrigin: CountryCode
		$source: MediaSource
		$season: MediaSeason
		$seasonYear: Int
		$year: String
		$onList: Boolean
		$yearLesser: FuzzyDateInt
		$yearGreater: FuzzyDateInt
		$episodeLesser: Int
		$episodeGreater: Int
		$durationLesser: Int
		$durationGreater: Int
		$chapterLesser: Int
		$chapterGreater: Int
		$volumeLesser: Int
		$volumeGreater: Int
		$licensedBy: [String]
		$isLicensed: Boolean
		$genres: [String]
		$excludedGenres: [String]
		$tags: [String]
		$excludedTags: [String]
		$minimumTagRank: Int
		$sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
	) {
		Page(page: $page, perPage: 20) {
			pageInfo {
				currentPage
				lastPage
			}
			media(
				id: $id
				type: $type
				season: $season
				format_in: $format
				status: $status
				countryOfOrigin: $countryOfOrigin
				source: $source
				search: $search
				onList: $onList
				seasonYear: $seasonYear
				startDate_like: $year
				startDate_lesser: $yearLesser
				startDate_greater: $yearGreater
				episodes_lesser: $episodeLesser
				episodes_greater: $episodeGreater
				duration_lesser: $durationLesser
				duration_greater: $durationGreater
				chapters_lesser: $chapterLesser
				chapters_greater: $chapterGreater
				volumes_lesser: $volumeLesser
				volumes_greater: $volumeGreater
				licensedBy_in: $licensedBy
				isLicensed: $isLicensed
				genre_in: $genres
				genre_not_in: $excludedGenres
				tag_in: $tags
				tag_not_in: $excludedTags
				minimumTagRank: $minimumTagRank
				sort: $sort
				isAdult: $isAdult
			) {
				id
				title {
					userPreferred
				}
				coverImage {
					extraLarge
					large
					color
				}
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
				bannerImage
				season
				description
				type
				format
				status(version: 2)
				episodes
				duration
				chapters
				volumes
				genres
				isAdult
				averageScore
				popularity
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					status
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
		}
	}
`;

const InfiniteSearchStaff = gql`
	query (
		$page: Int = 1
		$id: Int
		$search: String
		$isBirthday: Boolean
		$sort: [StaffSort] = [FAVOURITES_DESC]
	) {
		Page(page: $page, perPage: 20) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			staff(id: $id, search: $search, isBirthday: $isBirthday, sort: $sort) {
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
`;

const SearchStaff = gql`
	{
		staff: Page(page: 1, perPage: 30) {
			staff(sort: FAVOURITES_DESC) {
				id
				name {
					userPreferred
				}
				image {
					large
				}
			}
		}
		staffBirthdays: Page(page: 1, perPage: 30) {
			staff(isBirthday: true, sort: [FAVOURITES_DESC, ID_DESC]) {
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
`;

const InfiniteSearchCharacters = gql`
	query (
		$page: Int = 1
		$id: Int
		$search: String
		$isBirthday: Boolean
		$sort: [CharacterSort] = [FAVOURITES_DESC]
	) {
		Page(page: $page, perPage: 20) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			characters(
				id: $id
				search: $search
				isBirthday: $isBirthday
				sort: $sort
			) {
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
`;

const SearchCharacters = gql`
	{
		characters: Page(page: 1, perPage: 30) {
			characters(sort: FAVOURITES_DESC) {
				id
				name {
					userPreferred
				}
				image {
					large
				}
			}
		}
		characterBirthdays: Page(page: 1, perPage: 30) {
			characters(isBirthday: true, sort: [FAVOURITES_DESC, ID_DESC]) {
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
`;

const GetStaffMemberById = gql`
	query staff(
		$id: Int
		$sort: [MediaSort]
		$characterPage: Int
		$staffPage: Int
		$onList: Boolean
		$type: MediaType
		$withCharacterRoles: Boolean = false
		$withStaffRoles: Boolean = false
	) {
		Staff(id: $id) {
			id
			name {
				first
				middle
				last
				full
				native
				userPreferred
				alternative
			}
			image {
				large
			}
			description
			favourites
			isFavourite
			age
			gender
			yearsActive
			homeTown
			bloodType
			primaryOccupations
			dateOfBirth {
				year
				month
				day
			}
			dateOfDeath {
				year
				month
				day
			}
			language: languageV2
			characterMedia(page: $characterPage, sort: $sort, onList: $onList)
				@include(if: $withCharacterRoles) {
				pageInfo {
					total
					perPage
					currentPage
					lastPage
					hasNextPage
				}
				edges {
					characterRole
					characterName
					node {
						id
						type
						bannerImage
						title {
							userPreferred
						}
						coverImage {
							large
						}
						startDate {
							year
						}
						mediaListEntry {
							id
							status
						}
					}
					characters {
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
			staffMedia(page: $staffPage, type: $type, sort: $sort, onList: $onList)
				@include(if: $withStaffRoles) {
				pageInfo {
					total
					perPage
					currentPage
					lastPage
					hasNextPage
				}
				edges {
					staffRole
					node {
						id
						type
						title {
							userPreferred
						}
						coverImage {
							large
						}
						mediaListEntry {
							id
							status
						}
					}
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
	GetGenres,
	Search,
	SearchStaff,
	InfiniteSearchStaff,
	SearchCharacters,
	InfiniteSearchCharacters,
};
