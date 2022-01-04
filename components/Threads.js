import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import Thread from "./Thread";
import { useVisible } from "react-hooks-visible";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
import { getThreads } from "../graphql";

function Threads({ page, perPage }) {
	const router = useRouter();
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		["Threads", router.asPath],
		({ pageParam = 1 }) => {
			return getThreads({
				id: router.query.id,
				page: pageParam,
				perPage: 5,
			});
		},
		{
			getNextPageParam: (last, all) => {
				const { currentPage, lastPage } = last.Page.pageInfo;
				if (currentPage === lastPage) {
					return;
				}
				return +currentPage + 1;
			},
		}
	);
	const [targetRef, isVisible] = useVisible((vi) => vi > 0.5);

	useEffect(() => {
		if (isVisible) {
			fetchNextPage();
		}
	}, [isVisible]);

	if (isLoading) {
		return <ProgressBar />;
	}

	if (isError) {
		return <>Something went wrong!</>;
	}

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
				<div ref={targetRef}></div>
				{isFetchingNextPage ? (
					<div
						css={`
							text-align: center;
						`}>
						<Spinner />
					</div>
				) : (
					<button
						className="load-more"
						disabled={!hasNextPage || isFetchingNextPage}
						onClick={() => fetchNextPage()}>
						Load More
					</button>
				)}
			</div>
		</StyledThreads>
	);
}

export default Threads;

/**
 * Styled Components
 */

const StyledThreads = styled.div`
	> div:first-child {
		display: flex;
		justify-content: space-between;
	}
`;
