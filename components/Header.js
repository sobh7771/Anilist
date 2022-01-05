import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

let scrollBefore = 0;

function Header({ headerBackground }) {
	const [scrollDown, setScrollDown] = useState("");
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", function (e) {
			const scrolled = window.scrollY;

			setScrollY(scrolled);

			if (scrollBefore > scrolled) {
				scrollBefore = scrolled;
				setScrollDown(false);
			} else {
				scrollBefore = scrolled;
				setScrollDown(true);
			}
		});
	}, []);

	return (
		<div
			css={`
				position: fixed;
				background: ${(!scrollY && headerBackground) || "#2b2d42"};
				height: 68px;
				width: 100%;
				z-index: 100;
				transform: ${scrollDown && "translateY(-100%)"};
				transition: background 0.8s ease 0s, transform 0.5s ease 0s;
				display: flex;
				align-items: center;

				&:hover {
					background: #2b2d42;
				}
			`}>
			<div className="container">
				<StyledHeader>
					<div className="brand"></div>
					<nav>
						<ul>
							<li>
								<Link href={"/search/anime"}>
									<a>Browse</a>
								</Link>
							</li>
							<li>
								<Link href={"/social"}>
									<a>Social</a>
								</Link>
							</li>
							<li>
								<Link href={"/forum/overview"}>
									<a>Forum</a>
								</Link>
							</li>
							<li
								css={`
									margin-left: 7rem;
								`}>
								<Link href={"/login"}>
									<a>Login</a>
								</Link>
							</li>
							<li>
								<Link href={"/signup"}>
									<a
										css={`
											padding: 1rem 1.5rem;
											color: #fff !important;
											background: #3577ff;
											border-radius: 6px;
											box-shadow: 0 0 0 rgb(8 150 230 / 60%);
										`}>
										Sign up
									</a>
								</Link>
							</li>
						</ul>
					</nav>
				</StyledHeader>
			</div>
		</div>
	);
}

export default Header;

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #bcbedc;
	width: 100%;

	& nav {
	}
	& ul {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& li {
		&:not(:last-child) {
			margin-right: 1.6rem;
		}
	}
	& a {
		display: block;
		font-family: "Overpass", sans-serif;
		font-weight: 500;
		color: inherit;
		font-size: 1.4rem;
	}
`;
