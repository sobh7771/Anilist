import {
	GetOverview,
	GetCharacters,
	GetMedia,
	HomeQuery,
	GetThreads,
	GetStaff,
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
