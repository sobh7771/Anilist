import { getCharacters } from "../graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import Character from "./Character";
import { useVisible } from "react-hooks-visible";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
let scrollBefore = 0;

function Characters({ type }) {
	const router = useRouter();
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[router.asPath],
		({ pageParam = 1 }) => {
			return getCharacters({
				id: router.query.id,
				type,
				page: pageParam,
			});
		},
		{
			getNextPageParam: (last, all) => {
				const { currentPage, lastPage } = last.Media.characterPreview.pageInfo;

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
		<div>
			<div
				css={`
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
					grid-column-gap: 3rem;
					grid-row-gap: 1.5rem;
				`}>
				{data.pages.map((page) =>
					page.Media.characterPreview.edges.map((character) => (
						<Character key={character.id} character={character} />
					))
				)}
				<div ref={targetRef}></div>
			</div>
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
	);
}

Characters.defaultProps = {
	type: "ANIME",
};

export default Characters;
