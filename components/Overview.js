import { getOverview } from "../graphql";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Recommendations from "./Recommendations";
import Relations from "./Relations";
import Trailer from "./Trailer";
import Character from "./Character";
import ThreadsPreview from "./ThreadsPreview";
import ProgressBar from "./ProgressBar";
import StaffPreview from "./StaffPreview";

function Overview({ type }) {
	const router = useRouter();
	const { isLoading, isError, data } = useQuery(
		["Overview", router.query],
		() => getOverview({ type, id: router.query.id })
	);

	if (isLoading) {
		return <ProgressBar />;
	}

	if (isError) {
		return <>Something went wrong!</>;
	}

	const {
		relations,
		characterPreview,
		staffPreview,
		trailer,
		recommendations,
	} = data.Media;

	return (
		<div
			css={`
				> div:not(:last-child) {
					margin-bottom: 3rem;
				}
			`}>
			<div>
				<h2 className="mb-1">Relations</h2>
				<Relations relations={relations} />
			</div>
			<div>
				<h2 className="mb-1">Characters</h2>
				<div
					css={`
						display: grid;
						grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
						grid-column-gap: 3rem;
						grid-row-gap: 1.5rem;
					`}>
					{characterPreview.edges.map((character) => (
						<Character key={character.id} character={character} />
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-1">Staff</h2>
				<StaffPreview staff={staffPreview.edges} />
			</div>
			<Trailer trailer={trailer} />
			<Recommendations recommendations={recommendations.nodes} />
			<ThreadsPreview />
		</div>
	);
}

Overview.defaultProps = {
	type: "ANIME",
};

export default Overview;
