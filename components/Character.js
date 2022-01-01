import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";

function Character() {
	return (
		<StyledCharacter>
			<div>
				<Link href={"/"}>
					<a>
						<MyImage
							className="cover"
							src="https://s4.anilist.co/file/anilistcdn/staff/large/n111635-jL1n6ao0vMVq.png"
							width={60}
							height={80}
						/>
					</a>
				</Link>
				<div className="content">
					<Link href={"/"}>
						<a className="name link">Tanjiro Kamado</a>
					</Link>
					<p className="role">Main</p>
				</div>
			</div>
			<div>
				<div className="content">
					<p className="name">Tanjiro Kamado</p>
					<p className="role">Main</p>
				</div>
				<Link href={"/"}>
					<a>
						<MyImage
							className="cover"
							src="https://s4.anilist.co/file/anilistcdn/staff/large/n111635-jL1n6ao0vMVq.png"
							width={60}
							height={80}
						/>
					</a>
				</Link>
			</div>
		</StyledCharacter>
	);
}

export default Character;

const StyledCharacter = styled.div`
	display: flex;
	> div {
		border-radius: 4px;
		over-flow: hidden;
		width: 50%;
		display: flex;
	}
	.cover {
	}
	.content {
		width: calc(100% - 60px);
		height: 8rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #fafafa;
		padding: 1rem;
	}

	.name {
		color: #5c728a;
		font-size: 1.2rem;
	}

	.role {
		color: #9299a1;
		font-size: 1.1rem;
	}
`;
