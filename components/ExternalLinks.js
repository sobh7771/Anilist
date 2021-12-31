import Link from "next/link";
import styled from "styled-components";
import { StyledTags } from "./Tags";

function ExternalLinks({ externalLinks }) {
	if (!externalLinks.length) {
		return "";
	}
	return (
		<StyledExternalLinks>
			<h2>External &amp; Streaming links</h2>
			{externalLinks.map((link) => (
				<Link href={link.url} key={link.url}>
					<a target="_blank">{link.site}</a>
				</Link>
			))}
		</StyledExternalLinks>
	);
}

const StyledExternalLinks = styled(StyledTags)`
	h2 {
		color: #5c728a;
	}
	a {
		background: rgb(61, 180, 242);
		border-radius: 3px;
		color: #fff;
		display: block;
		font-size: 1.3rem;
		font-weight: 500;
		padding: 7px;
		text-align: center;
	}
`;

export default ExternalLinks;
