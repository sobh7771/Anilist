import styled, { css } from "styled-components";
import MediaCard from "./MediaCard";

function MediaCards({ mediaCards, view, isRanked }) {
	return (
		<Cards view={view}>
			{mediaCards.map((mediaCard, i) => (
				<MediaCard
					key={mediaCard.id}
					mediaCard={mediaCard}
					view={view}
					isRanked={isRanked}
					rank={i + 1}
				/>
			))}
		</Cards>
	);
}

MediaCards.defaultProps = {
	view: "small",
};

export default MediaCards;

/**
 * Styled Components
 */

const Cards = styled.div`
	display: grid;
	gap: 3rem;

	${({ view }) => {
		switch (view) {
			case "list":
				return css`
					grid-template-columns: 1fr;
				`;

			case "medium":
				return css`
					grid-template-columns: repeat(auto-fill, minmax(39rem, 1fr));
				`;

			case "small":
				return css`
					grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
				`;
		}
	}}
`;
