import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";

function Member({ member }) {
	return (
		<Card>
			<Link href={"/"}>
				<a className="cover">
					<MyImage src={member.node.image.large} layout="fill" />
				</a>
			</Link>
			<div className="content">
				<Link href={"/"}>
					<a className="name link">{member.node.name.userPreferred}</a>
				</Link>
				<div className="role">{member.role}</div>
			</div>
		</Card>
	);
}

export default Member;

/**
 * Styled Components
 */

const Card = styled.div`
	display: flex;
	border-radius: 3px;
	overflow: hidden;
	.cover {
		width: 5.2rem;
		height: 7.065rem;
		position: relative;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #fafafa;
		padding: 1rem;
		width: -webkit-fill-available;
	}
`;
