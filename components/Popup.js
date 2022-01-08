import styled, { css } from "styled-components";
import Genres from "@/components/Genres";
import helpers from "helpers";
import moment from "moment";

function Popup({
	position,
	color,
	nextAiringEpisode,
	format,
	averageScore,
	episodes,
	genres,
	studios,
	startDate,
}) {
	return (
		<StyledPopup position={position}>
			<Header>
				{nextAiringEpisode ? (
					<p>
						Ep {nextAiringEpisode.episode} airing{" "}
						{moment(nextAiringEpisode.airingAt * 1000).fromNow()}
					</p>
				) : (
					<p>
						{helpers.getSeason(helpers.getMonth(startDate.month))}{" "}
						{startDate.year}
					</p>
				)}
				{!!averageScore && (
					<div className="score">
						<p>{averageScore}%</p>
					</div>
				)}
			</Header>
			<Studios color={color}>
				{studios.edges.map((s) => s.node.name).join(" ")}
			</Studios>
			<Info>
				<span>{format === "TV" ? "TV Show" : helpers.capitalize(format)}</span>
				{episodes && (
					<>
						<span>•</span>
						<span>{episodes} episodes</span>
					</>
				)}
			</Info>
			<Genres genres={genres} color={color} layout="grid" />
		</StyledPopup>
	);
}

export default Popup;

/**
 * Styled Components
 */

export const StyledPopup = styled.div`
	font-family: Overpass;
	font-weight: 600;
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-105%);
	background: rgb(251, 251, 251);
	border-radius: 6px;
	box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
		0 4px 4px rgba(103, 132, 187, 0.05);
	min-width: 29rem;
	padding: 2.4rem;
	pointer-events: none;
	position: absolute;
	user-select: none;
	width: 100%;
	z-index: 10;
	opacity: 0;
	transition: all 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19);

	&::after {
		content: "";
		position: absolute;

		border: 7px solid;
		border-color: transparent;
		top: 1.8rem;
	}

	${(props) => {
		switch (props.position) {
			case "right":
				return css`
					left: 100%;
					transform: translateX(0%);

					&::after {
						left: -1.4rem;
						border-right-color: rgb(251, 251, 251);
					}
				`;
			case "left":
				return css`
					&::after {
						right: -14px;
						border-left-color: rgb(251, 251, 251);
					}
				`;
		}
	}}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	color: rgb(100, 115, 128);
	margin-bottom: 1rem;
`;
const Studios = styled.div`
	font-size: 1.3rem;
	color: ${({ color }) => color};
`;
const Info = styled(Studios)`
	margin: 6px 0 1rem;
	color: rgb(116, 136, 153);

	span:nth-child(2) {
		margin: 0 6px;
	}
`;
