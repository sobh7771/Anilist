import { useRouter } from "next/router";
import { useEffect } from "react";
import { useVisible } from "react-hooks-visible";
import { useInfiniteQuery } from "react-query";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";

function InfiniteScroll({ children, queryOptions }) {
	const router = useRouter();
	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(queryOptions);

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
		<>
			{children({ data })}
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

export default InfiniteScroll;
