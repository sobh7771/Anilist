import Relations from "./Relations";

function Overview() {
	return (
		<div
			css={`
				display: grid;
				grid-template-columns: 1fr;
				gap: 3rem;
			`}>
			<Relations />
		</div>
	);
}

export default Overview;
