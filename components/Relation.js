import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";

function Relation() {
	return (
		<StyledRelation>
			<MyImage
				src={
					"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx87216-c9bSNVD10UuD.png"
				}
				width={85}
				height={115}
				className="cover"
			/>
			<div className="content">
				<p className="info-header">Source</p>
				<Link href={"/"}>
					<a className="title link">Kimetsu no Yaiba</a>
				</Link>
				<p className="info">Manga . Finished</p>
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
