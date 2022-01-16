import { API_URL } from "config";
import request, { gql } from "graphql-request";
import _ from "lodash";
import { useRouter } from "next/router";
import InfiniteScroll from "./InfiniteScroll";
import RoleCard from "./RoleCard";
import RoleCards from "./RoleCards";

const GetStaffMemberCharacterMedia = gql`
	query staff($id: Int, $sort: [MediaSort], $page: Int, $onList: Boolean) {
		Staff(id: $id) {
			characterMedia(page: $page, sort: $sort, onList: $onList) {
				pageInfo {
					currentPage
					lastPage
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
		}
	}
`;

const getStaffMemberCharacterMedia = ({ queryKey, pageParam = 1 }) => {
	return request(API_URL, GetStaffMemberCharacterMedia, {
		page: pageParam,
		...queryKey[1],
	});
};

function InfiniteStaffMemberCharacterMedia() {
	const router = useRouter();
	return (
		<InfiniteScroll
			queryOptions={{
				queryFn: getStaffMemberCharacterMedia,
				queryKey: ["StaffMemberCharacterMedia", _.omit(router.query, "name")],
				getNextPageParam(last) {
					const { currentPage, lastPage } = last.Staff.characterMedia.pageInfo;

					if (currentPage === lastPage) {
						return;
					}

					return currentPage + 1;
				},
			}}>
			{({ data }) => (
				<RoleCards>
					{data.pages.map((page) =>
						page.Staff.characterMedia.edges.map((role) => (
							<RoleCard role={role} key={role.node.id} />
						))
					)}
				</RoleCards>
			)}
		</InfiniteScroll>
	);
}

export default InfiniteStaffMemberCharacterMedia;
