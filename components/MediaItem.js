import helpers from "helpers";
import Image from "next/image";
import Link from "next/link";
import Popup, { StyledPopup } from "Popup";
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";
import styled, { css } from "styled-components";
import Genres from "./Genres";

const StyledMediaItem = styled.div`
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

	span {
		color: rgb(139, 160, 178);
		font-size: 1.8rem;
		padding-right: 4px;
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

const shimmer =
	"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg==";

function MediaItem({ layout, rank, media, ranked }) {
	const ref = useRef(null);
	const [position, setPosition] = useState("");
	const {
		id,
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
		console.log(x, 290);
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
				<Link href={`/anime/${id}/${encodeURIComponent(title.userPreferred)}`}>
					<a>
						<Image
							css={`
								border-radius: 4px;
							`}
							src={coverImage.large}
							{...imgDimensions}
							objectFit="cover"
							placeholder="blur"
							blurDataURL={shimmer}
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
							href={`/anime/${id}/${encodeURIComponent(title.userPreferred)}`}>
							<a>{title.userPreferred}</a>
						</Link>
						{layout !== "grid" && (
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
								<p>{format === "TV" ? "TV show" : format}</p>
								<p>{episodes} episodes</p>
							</Format>
							<StyledDate>
								<p>
									{helpers.getSeason(helpers.getMonth(startDate.month - 1))}
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
				/>
			)}
		</div>
	);
}

export default MediaItem;
