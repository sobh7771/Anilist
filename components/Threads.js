import { API_URL } from "config";
import request, { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import InfiniteScroll from "./InfiniteScroll";
import Thread from "./Thread";

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

const getThreads = ({ pageParam = 1, queryKey }) =>
	request(API_URL, GetThreads, { ...queryKey[1], page: pageParam });

function Threads() {
	const router = useRouter();

	return (
		<StyledThreads>
			<div
				css={`
					.link {
						color: #647380;
						font-weight: 500;
						font-size: 1.4rem;
					}
				`}>
				<Link href="/">
					<a className="link mb-1">Threads</a>
				</Link>
				<Link href={"/"}>
					<a className="link create-new-thread">Create new thread</a>
				</Link>
			</div>
			<InfiniteScroll
				queryOptions={{
					queryFn: getThreads,
					queryKey: ["Threads", { id: router.query.id, perPage: 5 }],
					getNextPageParam: (last, all) => {
						const { currentPage, lastPage } = last.Page.pageInfo;
						if (currentPage === lastPage) {
							return;
						}
						return +currentPage + 1;
					},
				}}>
				{({ data }) => (
					<div
						css={`
							> div:not(:last-child) {
								margin-bottom: 1.5rem;
							}
						`}>
						{data.pages.map((page) =>
							page.Page.threads.map((thread) => (
								<Thread key={thread.id} thread={thread} />
							))
						)}
					</div>
				)}
			</InfiniteScroll>
		</StyledThreads>
	);
}

export default Threads;

/*
 * Styles
 */

const StyledThreads = styled.div`
	> div:first-child {
		display: flex;
		justify-content: space-between;
	}
`;
