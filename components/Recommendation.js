import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import helpers from "helpers";

function Recommendation({
	recommendation: {
		rating,
		mediaRecommendation: { id, title, coverImage, format },
	},
}) {
	const handleThumbUp = (params) => {};

	const handleThumbDown = (params) => {};
	const manga = ["MANGA", "NOVEL", "ONE_SHOT"];
	let href;

	if (manga.includes(format)) {
		href = `/manga/${id}/${encodeURIComponent(title.userPreferred)}`;
	} else {
		href = `/anime/${id}/${encodeURIComponent(title.userPreferred)}`;
	}

	return (
		<Card>
			<div>
				<Link href={href}>
					<a className="cover">
						<MyImage
							css={`
								border-radius: 4px;
								box-shadow: 0 4px 4px rgba(103, 132, 187, 0.05);
							`}
							src={coverImage.large}
							layout="fill"
						/>
					</a>
				</Link>
				<div>
					<div className="actions">
						<button className="thumb-up" onClick={handleThumbUp}>
							<FaThumbsUp className="thumb-up-icon" />
						</button>
						<button className="thumb-down" onClick={handleThumbDown}>
							<FaThumbsDown className="thumb-down-icon" />
						</button>
					</div>

					<p className="rating">+{rating}</p>
				</div>
			</div>
			<Link href={href}>
				<a className="title link">{helpers.formatTitle(title.userPreferred)}</a>
			</Link>
		</Card>
	);
}

export default Recommendation;

const Card = styled.div`
	position: relative;

	.cover {
		position: relative;
		height: 180px;
		width: 100%;
		display: block;
		margin-bottom: 1rem;
	}

	> div {
		position: relative;
		&:hover > div {
			opacity: 1;
		}
	}

	> div > div {
		background: rgba(31, 38, 49, 0.8);
		display: flex;
		padding: 10px 13px;
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.8);
		alien-items: center;
		border-radius: 5px;
		transition: opacity 0.25s ease-in-out;
		opacity: 0;
		justify-content: center;
	}

	.title {
		color: inherit;
		font-size: 1.3rem;
		font-weight: 600;
	}

	.actions {
		display: flex;
		alien-items: center;
		justify-content: center;
	}

	.thumb-up,
	.thumb-down {
		border: 0;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}
	.thumb-up {
	}
	.thumb-up-icon {
	}
	.thumb-down {
		margin-left: 8px;
	}
	.thumb-down-icon {
	}
	.rating {
		margin-left: 1.6rem;
		font-weight: 600;
	}
`;
