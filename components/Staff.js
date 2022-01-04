import { getStaff } from "../graphql";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import { useVisible } from "react-hooks-visible";
import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Member from "./Member";
import Spinner from "./Spinner";

function Staff() {
	const router = useRouter();
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		["Staff", router.asPath],
		({ pageParam = 1 }) => {
			return getStaff({
				id: router.query.id,
				type: "ANIME",
				page: pageParam,
			});
		},
		{
			getNextPageParam: (last, all) => {
				const { lastPage, currentPage } = last.Media.staff.pageInfo;

				if (lastPage === currentPage) {
					return;
				}

				return currentPage + 1;
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
					grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
					column-gap: 3rem;
					> div:not(:last-child) {
						margin-bottom: 1.5rem;
					}
				`}>
				{data.pages.map((page) =>
					page.Media.staff.edges.map((m) => <Member key={m.id} member={m} />)
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

export default Staff;
