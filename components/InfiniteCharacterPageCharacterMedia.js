import { API_URL } from "config";
import request, { gql } from "graphql-request";
import _ from "lodash";
import { useRouter } from "next/router";
import CharacterCharacterMediaRoleCard from "./CharacterCharacterMediaRoleCard";
import InfiniteScroll from "./InfiniteScroll";
import RoleCard from "./RoleCard";
import RoleCards from "./RoleCards";

const GetCharacterCharacterMedia = gql`
	query character($id: Int, $page: Int, $sort: [MediaSort]) {
		Character(id: $id) {
			media(page: $page, sort: $sort) {
				pageInfo {
					currentPage
					lastPage
				}
				edges {
					id
					characterRole
					voiceActorRoles(sort: [RELEVANCE, ID], language: JAPANESE) {
						roleNotes
						voiceActor {
							id
							name {
								userPreferred
							}
							image {
								large
							}
							language: languageV2
						}
					}
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
					}
				}
			}
		}
	}
`;

const getCharacterCharacterMedia = ({ queryKey, pageParam = 1 }) => {
	return request(API_URL, GetCharacterCharacterMedia, {
		page: pageParam,
		...queryKey[1],
	});
};

function InfiniteCharacterCharacterMedia() {
	const router = useRouter();
	return (
		<InfiniteScroll
			queryOptions={{
				queryFn: getCharacterCharacterMedia,
				queryKey: ["CharacterCharacterMedia", _.omit(router.query, "name")],
				getNextPageParam(last) {
					// const { currentPage, lastPage } = last.Staff.characterMedia.pageInfo;
					// if (currentPage === lastPage) {
					// 	return;
					// }
					// return currentPage + 1;
				},
			}}>
			{({ data }) => (
				<RoleCards>
					{data.pages.map((page) =>
						page.Character.media.edges.map((edge) => {
							return (
								<CharacterCharacterMediaRoleCard edge={edge} key={edge.id} />
							);
						})
					)}
				</RoleCards>
			)}
		</InfiniteScroll>
	);
}

export default InfiniteCharacterCharacterMedia;
