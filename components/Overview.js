import Characters from "./Characters";
import Relations from "./Relations";

function Overview() {
	return (
		<div
			css={`
				> div:not(:last-child) {
					margin-bottom: 3rem;
				}
			`}>
			<Relations />
			<Characters />
		</div>
	);
}

export default Overview;
