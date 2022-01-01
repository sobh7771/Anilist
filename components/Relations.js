import Relation from "./Relation";

function Relations() {
	return (
		<div>
			<h2
				css={`
					margin-bottom: 1rem;
				`}>
				Relations
			</h2>
			<div
				css={`
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
					grid-column-gap: 3rem;
					grid-row-gap: 1.5rem;
				`}>
				<Relation />
				<Relation />
			</div>
		</div>
	);
}

export default Relations;
