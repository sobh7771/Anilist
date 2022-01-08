import {
	GetOverview,
	GetCharacters,
	GetMedia,
	HomeQuery,
	GetThreads,
	GetStaff,
	GetGenres,
	Search,
} from "./queries";

const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient("https://graphql.anilist.co/");

export const getHomeQuery = (vars) => client.request(HomeQuery, vars);
export const getMedia = ({ id, type }) =>
	client.request(GetMedia, { id, type });
export const getOverview = (vars) => client.request(GetOverview, vars);
export const getCharacters = (vars) => client.request(GetCharacters, vars);
export const getThreads = (vars) => client.request(GetThreads, vars);
export const getStaff = (vars) => client.request(GetStaff, vars);
export const getGenres = () => client.request(GetGenres);
export const search = ({ queryKey, pageParam = 1 }) => {
	if (!queryKey[0].search) {
		queryKey[0] = JSON.parse(
			JSON.stringify({ ...queryKey[0], search: undefined })
		);
	}

	if (queryKey[0].year) {
		queryKey[0].year = `${queryKey[0].year}%`;
	}
	return client.request(Search, { ...queryKey[0], page: pageParam });
};
