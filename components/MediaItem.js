import helpers from "helpers";
import Link from "next/link";
import Popup, { StyledPopup } from "@/components/Popup";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Genres from "./Genres";
import MyImage from "./MyImage";
import moment from "moment";

const StyledMediaItem = styled.div`
	font-family: Overpass;
	${(props) => {
		switch (props.layout) {
			case "list":
				return css`
					background: rgb(251, 251, 251);
					border-radius: 4px;
					padding: 10px;
					box-shadow: 0 14px 30px rgba(103,132,187), 0.15),
		0 4px 4px rgba(103,132,187), 0.05);
					min-height: 80px;
					display: flex;
					flex-basis: 100%;
				`;

			case "grid":
				return css`
					&:hover ~ ${StyledPopup} {
						opacity: 1;
					}
				`;
		}
	}}
`;

const Title = styled.div`
	grid-column: 1/8;

	${(props) =>
		props.layout === "grid" &&
		css`
			margin-top: 4px;
		`}

	& a:first-child {
		font-size: 1.5rem;
		color: #516170;
		transition: 0.15s;
		margin-bottom: 4px;
		display: inline-block;

		&:hover {
			color: ${(props) => props.color};
		}

		${(props) =>
			props.layout === "grid" &&
			css`
				font-size: 1.4rem;
				color: #748899;
			`}
	}
`;

const style = css`
	p:nth-child(1) {
		color: #647380;
		font-size: 1.4rem;
	}

	p:nth-child(2) {
		color: rgb(139, 160, 178);
		font-size: 1.2rem;
		margin-top: 4px;
	}
`;

const Rank = styled.div`
	font-size: 2.4rem;
	color: #8ba0b2;
	padding: 1rem;
	flex-basis: 8rem;
	font-weight: 700;

	span {
		color: rgb(139, 160, 178);
		font-size: 1.8rem;
		padding-right: 4px;
		opacity: 0.8;
	}
`;

const Score = styled.div`
	grid-column: 8/10;
	${style}
`;
const Format = styled.div`
	grid-column: 10/12;
	${style}
`;
const StyledDate = styled.div`
	grid-column: 12/13;
	${style}
`;

function MediaItem({ layout, rank, media, ranked }) {
	const ref = useRef(null);
	const [position, setPosition] = useState("");
	const {
		id,
		type,
		title,
		coverImage,
		nextAiringEpisode,
		format,
		averageScore,
		episodes,
		genres,
		startDate,
		studios,
	} = media;

	useEffect(() => {
		const { x } = ref.current.getBoundingClientRect();

		if (x >= 290) {
			setPosition("left");
		} else {
			setPosition("right");
		}
	}, []);

	let imgDimensions = { width: 185, height: 265 };

	if (layout === "list") {
		imgDimensions = { width: 48, height: 65 };
	}

	return (
		<div
			ref={ref}
			css={`
				display: flex;
				align-items: center;
				position: relative;
			`}>
			{ranked && (
				<Rank>
					<span>#</span>
					{rank}
				</Rank>
			)}
			<StyledMediaItem layout={layout}>
				<Link
					href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
						title.userPreferred
					)}`}>
					<a>
						<MyImage
							css={`
								border-radius: 4px;
							`}
							src={coverImage.large}
							{...imgDimensions}
							objectFit="cover"
						/>
					</a>
				</Link>
				<div
					css={`
						${layout === "list" &&
						css`
							padding: 0.8rem 0.8rem 0.8rem 1.6rem;
							display: grid;
							grid-template-columns: repeat(12, 1fr);
							width: 100%;
						`}
					`}>
					<Title color={coverImage.color} layout={layout}>
						<Link
							href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
								title.userPreferred
							)}`}>
							<a>{title.userPreferred}</a>
						</Link>
						{layout === "list" && (
							<Genres genres={genres} color={coverImage.color} />
						)}
					</Title>

					{layout === "list" && (
						<>
							<Score>
								<p>{averageScore}%</p>
								<p>60695 users</p>
							</Score>
							<Format>
								<p>{format === "TV" ? "TV Show" : format}</p>
								<p>{episodes} episodes</p>
							</Format>
							<StyledDate>
								<p>
									{helpers.getSeason(helpers.getMonth(startDate.month - 1))}{" "}
									{startDate.year}
								</p>
								<p>Finished</p>
							</StyledDate>
						</>
					)}
				</div>
			</StyledMediaItem>

			{layout === "grid" && (
				<Popup
					position={position}
					color={coverImage.color}
					nextAiringEpisode={nextAiringEpisode}
					format={format}
					averageScore={averageScore}
					episodes={episodes}
					genres={genres}
					studios={studios}
					startDate={startDate}
				/>
			)}
		</div>
	);
}

MediaItem.defaultProps = {
	layout: "grid",
};

export default MediaItem;
