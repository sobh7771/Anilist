import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

let scrollBefore = 0;

function Header({ background }) {
	const [scrollDown, setScrollDown] = useState("");
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", function (e) {
			const scrolled = window.scrollY;
			setScrollY(scrolled);
		});
	}, []);

	useEffect(() => {
		if (scrollBefore > scrollY) {
			scrollBefore = scrollY;
			setScrollDown(false);
		} else {
			scrollBefore = scrollY;
			setScrollDown(true);
		}
	}, [scrollY]);

	return (
		<HeaderWrapper
			scrollY={scrollY}
			scrollDown={scrollDown}
			background={background}>
			<div className="container">
				<StyledHeader>
					<div className="brand"></div>
					<nav>
						<ul>
							<li
								css={`
									&:hover div {
										transform: translateY(0%);
										visibility: visible;
									}

									& > a {
										padding: 1rem 1.5rem;
									}
								`}>
								<Link href={"/search/anime"}>
									<a>Browse</a>
								</Link>
								<Dropdown />
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
		</HeaderWrapper>
	);
}

export default Header;

const HeaderWrapper = styled.header`
	position: fixed;
	background: ${({ scrollY, background }) =>
		(!scrollY && background) || "#2b2d42"};
	height: 68px;
	width: 100%;
	z-index: 1000;
	transform: ${({ scrollY, scrollDown }) =>
		scrollDown && scrollY ? "translateY(-100%)" : "translateY(0)"};
	transition: background 0.8s ease 0s, transform 0.5s ease 0s;
	display: flex;
	align-items: center;

	&:hover {
		background: #2b2d42;
	}
`;

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #bcbedc;
	width: 100%;

	ul {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	li {
		position: relative;
		&:not(:last-child) {
			margin-right: 1.6rem;
		}
	}
	a {
		display: block;
		font-family: "Overpass", sans-serif;
		font-weight: 500;
		color: inherit;
		font-size: 1.4rem;
	}
`;
