import Character from "./Character";

function Characters() {
	return (
		<div>
			<h2
				css={`
					margin-bottom: 1rem;
				`}>
				Characters
			</h2>
			<div
				css={`
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
					grid-column-gap: 3rem;
					grid-row-gap: 1.5rem;
				`}>
				<Character />
				<Character />
				<Character />
				<Character />
			</div>
		</div>
	);
}

export default Characters;
