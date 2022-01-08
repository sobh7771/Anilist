import Layout from "@/components/Layout";
import Filters from "@/components/Filters";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from "react-query";
import { search } from "../../graphql";
import MediaItem from "@/components/MediaItem";
import { useVisible } from "react-hooks-visible";
import Spinner from "@/components/Spinner";
import { useEffect } from "react";

function SearchPage() {
	const router = useRouter();

	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery([{ ...router.query, type: "ANIME" }], search, {
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

	if (isError) {
		return <>Something went wrong!</>;
	}

	return (
		<Layout title="Search Anime">
			<div
				css={`
					padding-top: 11.6rem;
				`}>
				<div className="container">
					<Filters />
					{isLoading ? (
						<ProgressBar />
					) : (
						<>
							<div
								css={`
									display: grid;
									gap: 2.4rem;
									grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
								`}>
								{data.pages.map((page) =>
									page.Page.media.map((media) => (
										<MediaItem key={media.id} media={media} />
									))
								)}
							</div>
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
					)}
				</div>
			</div>
		</Layout>
	);
}

export default SearchPage;
