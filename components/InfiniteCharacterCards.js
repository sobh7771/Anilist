import { searchInfiniteCharacters } from "@/graphql/index";
import helpers from "helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useVisible } from "react-hooks-visible";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import CharacterCard from "./CharacterCard";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";

function InfiniteCharacterCards({ queryFn }) {
	const router = useRouter();
	const pathnameArr = router.pathname.split("/");
	const type = pathnameArr[pathnameArr.length - 1];
	if (router.query.isBirthday) {
		router.query.isBirthday = !!router.query.isBirthday;
	}
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery([{ ...router.query }], queryFn, {
		enabled: !helpers.isEmpty(router.query),
		getNextPageParam: (last, all) => {
			const { currentPage, lastPage } = last.Page.pageInfo;
			if (currentPage === lastPage) return;

			return currentPage + 1;
		},
	});
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
		!helpers.isEmpty(router.query) && (
			<>
				<Cards>
					{data?.pages.map((page) =>
						page.Page[type].map((character) => (
							<CharacterCard key={character.id} {...character} />
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
		)
	);
}

export default InfiniteCharacterCards;

const Cards = styled.div`
	display: grid;
	gap: 3rem;
	grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
`;
