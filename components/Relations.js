import Relation from "./Relation";

function Relations({ relations }) {
	return (
		<div
			css={`
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
				grid-column-gap: 3rem;
				grid-row-gap: 1.5rem;
			`}>
			{relations.edges.map((relation) => (
				<Relation key={relation.id} relation={relation} />
			))}
		</div>
	);
}

export default Relations;
