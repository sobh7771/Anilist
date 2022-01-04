import helpers from "helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import MyImage from "./MyImage";

function Relation({ relation }) {
	const { id, format, status, title, coverImage } = relation.node;
	const manga = ["MANGA", "NOVEL", "ONE_SHOT"];
	let href;

	if (manga.includes(format)) {
		href = `/manga/${id}/${encodeURIComponent(title.userPreferred)}`;
	} else {
		href = `/anime/${id}/${encodeURIComponent(title.userPreferred)}`;
	}

	return (
		<StyledRelation>
			<Link href={href}>
				<a>
					<MyImage
						src={coverImage.large}
						width={85}
						height={115}
						className="cover"
					/>
				</a>
			</Link>
			<div className="content">
				<p className="info-header">
					{helpers.capitalize(relation.relationType)}
				</p>
				<Link
					href={`/${href}/${id}/${encodeURIComponent(title.userPreferred)}`}>
					<a className="title link">{title.userPreferred}</a>
				</Link>
				<p className="info">
					{helpers.capitalize(format)} . {helpers.capitalize(status)}
				</p>
			</div>
		</StyledRelation>
	);
}

export default Relation;

/**
 * Styled Components
 */

const StyledRelation = styled.div`
	display: grid;
	grid-template-columns: 85px auto;

	.cover {
		border-radius: 3px 0 0 3px;
	}
	.content {
		padding: 1.2rem;
		background: #fafafa;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.info-header {
		font-size: 1.2rem;
		color: #3db4f2;
	}
	.title {
		font-size: 1.4rem;
		color: #5c728a;
	}
	.info {
		font-size: 1.2rem;
		color: #9299a1;
	}
`;
