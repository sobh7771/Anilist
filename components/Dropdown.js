import Link from "next/link";
import styled from "styled-components";
import {
	FaPlay,
	FaBookOpen,
	FaUserTie,
	FaStar,
	FaThumbsUp,
} from "react-icons/fa";

function Dropdown() {
	return (
		<div
			css={`
				background: rgb(251, 251, 251);
				border-radius: 6px;
				box-shadow: 0 14px 30px rgba(103, 132, 187, 0.25),
					0 4px 4px rgba(103, 132, 187, 0.15);
				font-family: Overpass;
				position: absolute;
				top: 3.2rem;
				left: 0;
				transition: transform 0.2s;
				width: 27rem;
				visibility: hidden;
				transform: translateY(-10px);

				&::before {
					content: "";
					transform: scale(1.01);
					border-bottom: 0.6rem solid currentColor;
					border-left: 0.4rem solid transparent;
					border-right: 0.4rem solid transparent;
					bottom: 100%;
					color: rgb(251, 251, 251);
					left: 15%;
					position: absolute;
				}
			`}>
			<PrimaryLinks>
				<Link href={"/search/anime"}>
					<a>
						<FaPlay />
					</a>
				</Link>
				<div>
					<Link href={"/search/anime"}>
						<a className="primary-link-text">Anime</a>
					</Link>
					<SecondaryLinks>
						<Link href={"/search/anime/top-100"}>
							<a>Top 100</a>
						</Link>
						<Link href={"/search/anime/trending"}>
							<a>Trending</a>
						</Link>
						<Link href={"/search/anime/top-movies"}>
							<a>Top Movies</a>
						</Link>
					</SecondaryLinks>
				</div>
			</PrimaryLinks>
			<PrimaryLinks>
				<Link href={"/search/manga"}>
					<a>
						<FaBookOpen />
					</a>
				</Link>
				<div>
					<Link href={"/search/manga"}>
						<a className="primary-link-text">Manga</a>
					</Link>
					<SecondaryLinks>
						<Link href={"/search/manga/top-100"}>
							<a>Top 100</a>
						</Link>
						<Link href={"/search/manga/trending"}>
							<a>Trending</a>
						</Link>
						<Link href={"/search/manga/top-manhwa"}>
							<a>Top Manhwa</a>
						</Link>
					</SecondaryLinks>
				</div>
			</PrimaryLinks>
			<Footer>
				<Link href={"/search/staff"}>
					<a>
						<FaUserTie /> Staff
					</a>
				</Link>
				<Link href={"/search/characters"}>
					<a>
						<FaUserTie /> Characters
					</a>
				</Link>
				<Link href={"/reviews"}>
					<a>
						<FaStar /> Reviews
					</a>
				</Link>
				<Link href={"/recommendations"}>
					<a>
						<FaThumbsUp /> Recommendations
					</a>
				</Link>
			</Footer>
		</div>
	);
}

export default Dropdown;

const PrimaryLinks = styled.div`
	padding: 21px 27px;
	display: flex;

	&:nth-child(1) {
		padding-bottom: 0;
	}

	> a {
		color: #647380 !important;
	}

	> div {
		margin-left: 1.4rem;

		& > a {
			color: #647380;
			font-size: 1.5rem;
		}
	}
`;

const SecondaryLinks = styled.div`
	display: flex;
	margin-top: 7px;
	align-items: center;
	justify-content: center;

	a {
		color: #8ba0b2 !important;
		font-size: 1.1rem !important;

		&:not(:last-child) {
			margin-right: 6px;
		}
	}
`;

const Footer = styled.div`
	padding: 16px 27px;
	background: rgb(237, 241, 245);
	border-radius: 0 0 6px 6px;

	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	row-gap: 1.4rem;
	justify-content: center;
	a {
		color: #748899 !important;
		font-size: 1.1rem !important;
	}
`;
