import Link from "next/link";
import styled from "styled-components";

function Tags({ tags }) {
	if (!tags.length) return "";
	return (
		<StyledTags>
			<h2>Tags</h2>
			{tags.map((tag) => (
				<Tag key={tag.id} isMediaSpoiler={tag.isMediaSpoiler}>
					<Link href={`/search/anime?genres=${tag.name}`}>
						<a>{tag.name}</a>
					</Link>
					<p className="rank">{tag.rank}%</p>
				</Tag>
			))}
		</StyledTags>
	);
}

export const StyledTags = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;

	h2 {
		font-size: 1.4rem;
		font-weight: 500;
		color: rgb(92, 114, 138);
	}
`;

const Tag = styled.div`
	display: flex;
	font-weight: 500;
	background: #fff;
	border-radius: 3px;
	padding: 8px 12px;
	width: 100%;
	color: #5c728a;
	transition: 0.15s;
	justify-content: space-between;

	a {
		font-size: 1.3rem;
		color: ${({ isMediaSpoiler }) =>
			isMediaSpoiler ? "rgb(232,93,117)" : "#5c728a"};
		transition: 0.15s;

		&:hover {
			color: #3db4f2;
		}
	}
	.rank {
		font-size: 1.2rem;
		color: #9299a1;
	}
`;

export default Tags;
