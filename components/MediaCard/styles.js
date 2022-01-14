import chroma from "chroma-js";
import styled from "styled-components";
import { css } from "styled-components";

const CardWrapper = styled.div`
	> .rank {
		font-weight: 700;
	}
	> .rank .hash {
		opacity: 0.7;
	}
	${({ view }) => {
		switch (view) {
			case "list":
				return css`
					display: flex;
					align-items: center;
					position: relative;

					& > .rank {
						font-size: 2.4rem;
						color: #8ba0b2;
						padding: 1rem;
						flex-basis: 8rem;
					}

					& > .rank .hash {
						color: rgb(139, 160, 178);
						font-size: 1.8rem;
					}
				`;
			case "medium":
				return css``;
			case "small":
				return css`
					position: relative;
					> .rank {
						display: flex;
						align-items: center;
						justify-content: center;
						background: ${({ color }) => color};
						color: #fff5f8;
						width: 3.8rem;
						height: 3.8rem;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
						transform: translate(-25%, -25%);
						border-radius: 50%;
					}

					> .hash {
						font-size: 1.2rem;
					}
				`;
		}
	}}
`;

const Content = styled.div`
	width: -webkit-fill-available;
	display: flex;
	flex-direction: column;

	&::after {
		content: "";
		position: absolute;

		border: 7px solid;
		border-color: transparent;
		top: 1.8rem;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(81, 97, 112);
		&:hover {
			color: ${(props) => props.color};
		}
	}

	.description {
		display: none;
	}

	.body {
		overflow-y: scroll;
	}

	.description,
	.typings {
		color: #748899;
		font-size: 1.1rem;
	}

	.description {
		color: #8ba0b2;
		line-height: 1.6;
	}

	.date {
		color: #647380;
		font-size: 1.5rem;
		letter-spacing: 0.02em;
		font-weight: 600;
	}

	.rank {
		display: none;
	}

	.header {
		margin-bottom: 0;
	}

	.footer {
		font-size: 1.2rem;
	}

	.list-score,
	.list-format,
	.list-date {
		display: none;
	}

	${({ view }) => {
		switch (view) {
			case "small":
				return css`
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
					user-select: none;
					width: 100%;
					z-index: 10;
					opacity: 0;
					transition: opacity 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
					${({ position }) => {
						switch (position) {
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
										right: -1.4rem;
										border-left-color: rgb(251, 251, 251);
									}
								`;
						}
					}}

					.header {
						display: flex;
						justify-content: space-between;
						margin-bottom: 0;
					}

					.date {
						font-size: 1.6rem;
					}

					.typings {
						font-size: 1.3rem;
						font-weight: 600;
						margin-top: 6px;
					}

					.footer {
						padding-top: 1.6rem;
					}
				`;

			case "medium":
				return css`
					.description {
						display: block;
					}

					.score {
						color: #748899;
						font-size: 1.3rem;
					}

					.typings {
						padding-top: 9px;
					}

					.body {
						padding: 1.7rem 1.7rem 1rem;
						height: calc(265px - 44px);
						overflow-y: scroll;
					}

					.header {
						margin-bottom: 6px;
					}

					.rank {
						display: block;
					}

					.rank,
					.hash {
						color: #5c728a;
						font-size: 1.6rem;
						font-weight: 600;
					}

					.hash {
						font-size: 1.4rem;
						opacity: 0.8;
					}

					.header {
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
					}

					.footer {
						background: rgb(237, 241, 245);
						padding: 0 1.7rem;
						height: 4.4rem;
						display: flex;
						align-items: center;
					}
				`;

			case "list":
				return css`
					display: grid;
					grid-template-columns: repeat(16, 1fr);
					padding: 8px;
					padding-left: 1.6rem;
					grid-auto-flow: column;

					.body,
					.footer {
						grid-column: 1/10;
					}
					.body {
					}
					.footer {
						font-size: 1.1rem;
					}

					.list-score,
					.list-format,
					.list-date {
						display: block;
						color: rgb(139, 160, 178);
						font-size: 1.2rem;
						font-weight: 700;

						&.percentage {
							color: #647380;
							font-size: 1.4rem;
						}
					}

					.list-score {
						grid-column: 10/12;
					}
					.list-format {
						grid-column: 12/14;
					}
					.list-date {
						grid-column: 14/17;
					}

					.score {
						display: none;
					}

					.typings {
						display: none;
					}
				`;
		}
	}}
`;

const Card = styled.div`
	font-family: Overpass;
	display: flex;
	border-radius: 4px;

	&:hover ${Content} {
		opacity: 1;
	}

	${({ view }) => {
		switch (view) {
			case "list":
				return css`
					padding: 1rem;
					overflow: hidden;
					background: rgb(251, 251, 251);
					box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
						0 4px 4px rgba(103, 132, 187, 0.05);
					width: -webkit-fill-available;
				`;
			case "medium":
				return css`
					overflow: hidden;
					background: rgb(251, 251, 251);
					box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
						0 4px 4px rgba(103, 132, 187, 0.05);
				`;
			case "small":
				return css`
					position: relative;
				`;

			default:
				return css``;
		}
	}}

	> div:first-child {
		position: relative;
	}
	.cover {
		position: relative;
		display: block;

		${({ view }) => {
			switch (view) {
				case "list":
					return css`
						width: 48px;
						height: 60px;
						border-radius: 2px;
						overflow: hidden;
					`;
				case "small":
					return css`
						width: 185px;
						height: 265px;
						border-radius: 4px;
						overflow: hidden;
					`;

				default:
					return css`
						width: 185px;
						height: 265px;
					`;
			}
		}}
	}
`;

const Studios = styled.div`
	display: ${({ view }) => (view === "small" ? "block" : "none")};
	font-size: 1.3rem;
	color: ${({ color }) => color};
	margin-top: 1rem;

	a {
		color: inherit;
	}
`;

const Overlay = styled.div`
	.overlay-title {
		&:hover {
			color: ${(props) => props.color};
		}
	}
	.overlay-studio {
		display: ${({ view }) => (view === "medium" ? "block" : "none")};

		${Studios} {
			display: block;
		}
	}

	${({ view }) => {
		switch (view) {
			case "list":
				return css`
					display: none;
				`;
			case "medium":
				return css`
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					background: rgba(31, 38, 49, 0.9);
					padding: 1.2rem;
					font-weight: 600;
					line-height: 2rem;

					.overlay-title {
						color: rgb(255, 255, 255);
						font-size: 1.4rem;
					}

					.overlay-studio {
						margin-top: 8px;
						display: ${({ view }) => (view === "medium" ? "block" : "none")};

						a {
							color: ${({ color }) => color};
							font-size: 1.2rem;
						}
					}
				`;
			case "small":
				return css`
					.overlay-title {
						margin-top: 4px;
						font-size: 1.4rem;
						color: #748899;
						transition: 0.15s;
						margin-bottom: 4px;
						display: inline-block;
					}
				`;

			default:
				return css``;
		}
	}}
`;

const Genres = styled.div`
	height: 2rem;
	overflow: hidden;
	.genre {
		display: inline-block;
		background: ${({ color }) => chroma(color).brighten().hex()};
		border-radius: 1rem;
		color: ${({ color }) => chroma(color).darken().hex()};
		font-size: inherit;
		font-weight: 700;
		height: 2rem;
		line-height: 2rem;
		margin-right: 1.1rem;
		padding: 0 1.2rem;
		text-transform: lowercase;
	}

	${({ view }) => {
		switch (view) {
			case "list":
				return css``;
			case "medium":
				return css``;
			case "small":
				return css``;
		}
	}}
`;

export { CardWrapper, Card, Overlay, Content, Genres, Studios };
