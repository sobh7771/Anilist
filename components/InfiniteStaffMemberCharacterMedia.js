import { API_URL } from "config";
import request, { gql } from "graphql-request";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import InfiniteScroll from "./InfiniteScroll";
import MyImage from "./MyImage";
import RoleCard from "./RoleCard";

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
		...queryKey[0],
	});
};

function InfiniteStaffMemberCharacterMedia() {
	const router = useRouter();
	return (
		<div className="container">
			<InfiniteScroll
				queryOptions={{
					queryFn: getStaffMemberCharacterMedia,
					queryKey: _.omit(router.query, "name"),
					getNextPageParam(last, all) {
						const { currentPage, lastPage } =
							last.Staff.characterMedia.pageInfo;

						if (currentPage === lastPage) {
							return;
						}

						return currentPage + 1;
					},
				}}>
				{({ data }) => (
					<div
						css={`
							display: grid;
							grid-template-columns: repeat(auto-fill, 185px);
							justify-content: space-between;
							margin-bottom: 40px;
							gap: 3rem;
						`}>
						{data.pages.map((page) =>
							page.Staff.characterMedia.edges.map((role) => {
								console.log(role.characters);
								return <RoleCard role={role} key={role.node.id} />;
								return <></>;
							})
						)}
					</div>
				)}
			</InfiniteScroll>
		</div>
	);
}

export default InfiniteStaffMemberCharacterMedia;
