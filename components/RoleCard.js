import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";

function RoleCard({ role }) {
	const { node } = role;
	const character = role.characters[0];
	return (
		!!character && (
			<Card>
				<Link
					href={`/characters/${character.id}/${character.name.userPreferred}`}>
					<a className="cover">
						<MyImage src={character.image.large} layout="fill" />
					</a>
				</Link>

				<div className="titles">
					<Link
						href={`/characters/${character.id}/${character.name.userPreferred}`}>
						<a className="title">{character.name.userPreferred}</a>
					</Link>
					<div className="relations">
						<Link
							href={`/${node.type.toLowerCase()}/${node.id}/${
								node.title.userPreferred
							}`}>
							<a className="relation-title">{node.title.userPreferred}</a>
						</Link>
						<Link
							href={`/${node.type.toLowerCase()}/${node.id}/${
								node.title.userPreferred
							}`}>
							<a className="relation-img">
								<MyImage src={node.coverImage.large} layout="fill" />
							</a>
						</Link>
					</div>
				</div>
			</Card>
		)
	);
}

export default RoleCard;

export const Card = styled.div`
	position: relative;
	.cover {
		border-radius: 4px;
		box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
			0 4px 4px rgba(103, 132, 187, 0.05);
		display: inline-block;
		width: 185px;
		height: 265px;
		overflow: hidden;
		position: relative;
	}

	.titles {
		font-family: Overpass;
	}
	.title {
		font-size: 1.4rem;
		margin-top: 1rem;
		color: #748899;
	}
	.relations {
	}
	.relation-title {
		font-size: 1.2rem;
		margin-top: 2px;
		color: #8ba0b2;
	}
	.relation-img {
		position: absolute;
		top: 180px;
		right: 0;
		height: 85px;
		width: 65px;
		border-left: solid 2px rgb(237, 241, 245);
		border-radius: 4px 0 4px 0;
		border-top: solid 2px rgb(237, 241, 245);
		overflow: hidden;
	}
`;
