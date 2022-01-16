import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledMediaNavBar = styled.nav`
	margin-top: 1.6rem;
	ul {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		text-align: center;
		li {
			transition: background-color 0.15s;
			color: #5c728a;
			&:hover {
				color: #3db4f2;
			}
		}

		a {
			font: inherit;
			font-size: 1.3rem;
			color: inherit;
		}
	}
`;

function MediaNavBar() {
	const router = useRouter();
	const hash = router.asPath.split("#")[1];
	const { id, slug } = router.query;

	const type = router.asPath.split("/")[1];

	return (
		<StyledMediaNavBar>
			<ul>
				<li
					css={`
						${!hash && "color: #3db4f2 !important;"}
					`}>
					<Link href={`/${type}/${id}/${encodeURIComponent(slug)}`}>
						<a>Overview</a>
					</Link>
				</li>
				<li
					css={`
						${hash === "characters" && "color: #3db4f2 !important;"}
					`}>
					<Link href={`#characters`}>
						<a>Characters</a>
					</Link>
				</li>
				<li
					css={`
						${hash === "stuff" && "color: #3db4f2 !important;"}
					`}>
					<Link href={`#staff`}>
						<a>Staff</a>
					</Link>
				</li>
				<li
					css={`
						${hash === "stats" && "color: #3db4f2 !important;"}
					`}>
					<Link href={`#stats`}>
						<a>Stats</a>
					</Link>
				</li>
				<li
					css={`
						${hash === "social" && "color: #3db4f2 !important;"}
					`}>
					<Link href={`#social`}>
						<a>Social</a>
					</Link>
				</li>
			</ul>
		</StyledMediaNavBar>
	);
}

export default MediaNavBar;
