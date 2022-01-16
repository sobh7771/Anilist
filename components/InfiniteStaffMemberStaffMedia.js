import { API_URL } from "config";
import request, { gql } from "graphql-request";
import _ from "lodash";
import { useRouter } from "next/router";
import styled from "styled-components";
import InfiniteScroll from "./InfiniteScroll";
import RoleCards from "./RoleCards";
import StaffMemberStaffMediaCard from "./StaffMemberStaffMediaCard";

const GetStaffMemberStaffMedia = gql`
	query staff(
		$id: Int
		$sort: [MediaSort]
		$page: Int
		$onList: Boolean
		$type: MediaType
	) {
		Staff(id: $id) {
			staffMedia(page: $page, type: $type, sort: $sort, onList: $onList) {
				pageInfo {
					currentPage
					lastPage
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

const getStaffMemberStaffMedia = ({ queryKey, pageParam = 1 }) => {
	return request(API_URL, GetStaffMemberStaffMedia, {
		page: pageParam,
		...queryKey[1],
	});
};

function InfiniteStaffMemberStaffMedia() {
	const router = useRouter();
	return (
		<InfiniteScroll
			queryOptions={{
				queryFn: getStaffMemberStaffMedia,
				queryKey: ["StaffMemberStaffMedia", _.omit(router.query, "name")],
				getNextPageParam(last) {
					const { currentPage, lastPage } = last.Staff.staffMedia.pageInfo;
					console.log(currentPage, lastPage);
					if (currentPage === lastPage) {
						return;
					}
					return currentPage + 1;
				},
			}}>
			{({ data }) => (
				<>
					<Headline>Anime staff rules</Headline>
					<RoleCards>
						{data.pages.map((page) =>
							page.Staff.staffMedia.edges.map((staffMedia) => {
								return (
									<StaffMemberStaffMediaCard
										key={staffMedia.node.id}
										staffMedia={staffMedia}
									/>
								);
							})
						)}
					</RoleCards>
				</>
			)}
		</InfiniteScroll>
	);
}

export default InfiniteStaffMemberStaffMedia;

const Headline = styled.h3`
	font-family: Overpass;
	font-size: 1.6rem;
	text-transform: uppercase;
	font-weight: 700;
	color: rgb(116, 136, 153);
	margin-bottom: 2rem;
`;
