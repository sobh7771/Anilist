import helpers from "helpers";
import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";

function Character({ character: { id, role, node, voiceActors } }) {
	return (
		<StyledCharacter>
			<div
				css={`
					width: 50%;
					display: grid;
					grid-template-columns: 6rem auto;
				`}>
				<Link href={"/"}>
					<a className="cover">
						<MyImage src={node.image.large} layout="fill" />
					</a>
				</Link>
				<div className="content">
					<Link href={"/"}>
						<a className="name link">{node.name.userPreferred}</a>
					</Link>
					<p className="role">{helpers.capitalize(role)}</p>
				</div>
			</div>
			{voiceActors[0] ? (
				<div
					css={`
						width: 50%;
						display: grid;
						grid-template-columns: auto 6rem;
					`}>
					<div className="content">
						<Link href={"/"}>
							<a className="name link">{voiceActors[0].name.userPreferred}</a>
						</Link>
						<p className="role">{voiceActors[0].language}</p>
					</div>
					<Link href={"/"}>
						<a className="cover">
							<MyImage src={voiceActors[0].image.large} layout="fill" />
						</a>
					</Link>
				</div>
			) : (
				<></>
			)}
		</StyledCharacter>
	);
}

export default Character;

const StyledCharacter = styled.div`
	display: flex;
	border-radius: 3px;
	overflow: hidden;
	background: #fafafa;
	height: max-content;
	.cover {
		position: relative;
		width: 6rem;
		height: 8rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1rem;
	}
`;
