import MediaNavBar from "@/components/MediaNavBar";
import SideBar from "@/components/SideBar";
import { getMedia } from "../../../graphql";
import { gql, request } from "graphql-request";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import Layout from "@/components/Layout";

const shimmer =
	"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg==";

function AnimePage({ data }) {
	const router = useRouter();
	const [showFullDescription, setShowFullDescription] = useState(false);

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { title, bannerImage, coverImage, description, ...rest } = data.Media;

	const length = description.length;
	const maxLength = 674;
	const maxDescription = description.substring(0, maxLength - 1);

	return (
		<Layout title={title.userPreferred}>
			<Header>
				<div className="banner">
					{bannerImage && (
						<Image
							src={bannerImage}
							layout="fill"
							objectFit="cover"
							priority
							placeholder="blur"
							blurDataURL={shimmer}
						/>
					)}
				</div>
				<div
					className="container"
					css={`
						display: grid;
						grid-template-columns: 20% 80%;
						gap: 1.6rem;
					`}>
					<div
						css={`
							box-shadow: 0 0 29px rgb(49 54 68 / 25%);
							width: 215px;
							height: 307px;
							position: relative;
							transform: translateY(-35%);
						`}>
						<CoverImage
							src={coverImage.large}
							layout="fill"
							placeholder="blur"
							blurDataURL={shimmer}
						/>
					</div>

					<Content>
						<h1>{title.userPreferred}</h1>
						<p
							className="description"
							dangerouslySetInnerHTML={{
								__html: showFullDescription ? description : maxDescription,
							}}></p>
						{length >= maxLength && !showFullDescription && (
							<button
								onClick={() => {
									setShowFullDescription(true);
								}}
								className="read-more">
								Read More
							</button>
						)}

						<MediaNavBar />
					</Content>
				</div>
			</Header>

			<div className="container">
				<div
					css={`
						display: grid;
						grid-column-gap: 4rem;
						grid-template-columns: 20.8rem auto;
						margin: 3rem 0;
					`}>
					<SideBar {...rest} title={title} />
				</div>
			</div>
		</Layout>
	);
}

export default AnimePage;

export const getStaticPaths = async () => {
	const query = gql`
		{
			Page(page: 1, perPage: 5) {
				media(sort: TRENDING_DESC, type: ANIME) {
					id
					title {
						userPreferred
					}
				}
			}
		}
	`;
	const d = await request("https://graphql.anilist.co/", query);

	const paths = d.Page.media.map((el) => ({
		params: { id: el.id + "", slug: el.title.userPreferred },
	}));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params: { id } }) => {
	const data = await getMedia({ id, type: "ANIME" });

	return {
		props: {
			data,
		},
		revalidate: 10,
	};
};

/**
 * Styled Components
 */

const Header = styled.div`
	background: #fafafa;
	.banner {
		position: relative;
		width: 100vw;
		height: 40rem;
		margin-top: -4.8rem;

		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			background: linear-gradient(
				180deg,
				rgba(6, 13, 34, 0) 40%,
				rgba(6, 13, 34, 0.6)
			);
			height: 100%;
			width: 100%;
		}
	}
`;
const Content = styled.div`
	padding-top: 2.5rem;
	position: relative;
	h1 {
		color: #5c728a;
		font-size: 1.9rem;
	}
	.description {
		color: #7a858f;
		font-size: 1.4rem;
		padding: 1.6rem 0;
		line-height: 1.5;

		span {
			display: block;
			margin: 1.6rem 0;
		}

		i {
			display: block;
		}
	}

	.read-more {
		background: linear-gradient(
			0deg,
			rgb(250, 250, 250) 30%,
			rgba(250, 250, 250, 0.4)
		);
		color: rgb(146, 153, 161);
		position: absolute;
		bottom: 25%;
		left: 0;
		width: 100%;
		height: 5rem;
		cursor: pointer;
		font-size: 1.4rem;
		font-weight: 500;
		border: 0;
		text-align: center;
		transition: 0.15s;

		&:hover {
			color: #3db4f2;
		}
	}
`;

const CoverImage = styled(Image)`
	border-radius: 2px;
`;
