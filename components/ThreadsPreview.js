import { getThreads } from "../graphql";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Thread from "./Thread";
import Link from "next/link";

function ThreadsPreview() {
	const router = useRouter();
	const { isLoading, isError, data } = useQuery(
		router.query.id,
		({ queryKey }) => getThreads({ id: queryKey[0], perPage: 2 })
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Something went wrong!</div>;
	}
	return (
		<div
			css={`
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			`}>
			<div>
				<div
					css={`
						display: flex;
						justify-content: space-between;
						.link {
							color: #647380;
							font-weight: 500;
							font-size: 1.4rem;
						}
					`}>
					<Link href="#social">
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
					{data.Page.threads.map((thread) => (
						<Thread key={thread.id} thread={thread} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ThreadsPreview;
