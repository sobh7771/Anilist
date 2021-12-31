import styled from "styled-components";
import { css } from "styled-components";
import MediaItem from "./MediaItem";

const StyledMediaList = styled.div`
	display: grid;
	gap: 2.4rem;

	${(props) => {
		switch (props.layout) {
			case "grid":
				return css`
					grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
				`;

			case "list":
				return css`
					grid-template-columns: 1fr;
				`;
		}
	}}
`;

function MediaList({ layout = "grid", mediaList, ranked }) {
	return (
		<StyledMediaList layout={layout}>
			{mediaList.map((media, i) => (
				<MediaItem
					key={i}
					layout={layout}
					media={media}
					rank={i + 1}
					ranked={ranked}
				/>
			))}
		</StyledMediaList>
	);
}

export default MediaList;
