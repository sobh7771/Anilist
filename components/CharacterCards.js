import Link from "next/link";
import styled from "styled-components";
import CharacterCard from "./CharacterCard";

function CharacterCards({ characters, title, link }) {
	return (
		!!characters && (
			<>
				<Link href={link}>
					<a>
						<h3>{title}</h3>
						<span className="expand">View all</span>
					</a>
				</Link>
				<Cards>
					{characters.map((character) => (
						<CharacterCard key={character.id} {...character} />
					))}
				</Cards>
			</>
		)
	);
}

export default CharacterCards;

const Cards = styled.div`
	display: grid;
	gap: 3rem;
	grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));

	&:not(:last-child) {
		margin-bottom: 5rem;
	}
`;
