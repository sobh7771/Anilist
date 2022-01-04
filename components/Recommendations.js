import Recommendation from "./Recommendation";

function Recommendations({ recommendations }) {
	return (
		!!recommendations.length && (
			<>
				<h2 className="mb-1">Recommendations</h2>
				<div
					css={`
						display: grid;
						grid-template-columns: repeat(auto-fill, 130px);
						grid-gap: 20px;
					`}>
					{recommendations.map((recommendation) => (
						<Recommendation
							key={recommendation.id}
							recommendation={recommendation}
						/>
					))}
				</div>
			</>
		)
	);
}

export default Recommendations;
