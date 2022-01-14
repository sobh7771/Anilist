import styled, { css } from "styled-components";
import MediaCard from "./MediaCard";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from "react-query";
import { search } from "../graphql";
import { useVisible } from "react-hooks-visible";
import Spinner from "@/components/Spinner";
import { useEffect } from "react";
import _ from "lodash";

function InfiniteMediaCards({ view, filters }) {
	const router = useRouter();
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[{ ..._.omit(router.query, ["slug"]), ...filters }],
		search,
		{
			getNextPageParam: (last, all) => {
				const { currentPage, lastPage } = last.Page.pageInfo;
				if (currentPage === lastPage) return;

				return currentPage + 1;
			},
		}
	);
	const [targetRef, isVisible] = useVisible((vi) => vi > 0.5);
	const { sort, slug } = router.query;
	const isRanked = sort === "SCORE_DESC" || slug[1]?.includes("top");
	let rank = 1;

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
		<>
			<Cards view={view}>
				{data.pages.map((page) =>
					page.Page.media.map((mediaCard, i) => (
						<MediaCard
							key={mediaCard.id}
							mediaCard={mediaCard}
							view={view}
							isRanked={isRanked}
							rank={rank++}
						/>
					))
				)}
			</Cards>
			<div
				ref={targetRef}
				css={`
					margin-bottom: 2.4rem;
				`}></div>
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
		</>
	);
}

InfiniteMediaCards.defaultProps = {
	view: "small",
};

export default InfiniteMediaCards;

/**
 * Styled Components
 */

const Cards = styled.div`
	display: grid;
	gap: 3rem;

	${({ view }) => {
		switch (view) {
			case "list":
				return css`
					grid-template-columns: 1fr;
				`;

			case "medium":
				return css`
					grid-template-columns: repeat(auto-fill, minmax(39rem, 1fr));
				`;

			case "small":
				return css`
					grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
				`;
		}
	}}
`;
