import MediaNavBar from "@/components/MediaNavBar";
import SideBar from "@/components/SideBar";
import { getMedia } from "../../../graphql";
import { gql, request } from "graphql-request";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import Layout from "@/components/Layout";
import MyRouter from "@/components/MyRouter";
import Overview from "@/components/Overview";
import Characters from "@/components/Characters";
import Staff from "@/components/Staff";
import Threads from "@/components/Threads";
import MyImage from "@/components/MyImage";

function AnimePage({ data }) {
	const router = useRouter();
	const [showFullDescription, setShowFullDescription] = useState(false);
	const { id, slug } = router.query;

	const { title, bannerImage, coverImage, description, ...rest } = data.Media;
	let length, maxLength, maxDescription;

	if (description) {
		length = description.length;
		maxLength = 674;
		maxDescription = description.substring(0, maxLength - 1);
	}

	return (
		<Layout title={title.userPreferred} background="rgba(35,38,67,.5)">
			<Header>
				<div className="banner">
					{bannerImage && <MyImage src={bannerImage} layout="fill" priority />}
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
						<CoverImage src={coverImage.large} layout="fill" />
					</div>

					<Content>
						<div>
							<h1>{title.userPreferred}</h1>
							<p
								className="description"
								dangerouslySetInnerHTML={{
									__html: showFullDescription ? description : maxDescription,
								}}></p>
						</div>
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
						align-items: start;
					`}>
					<SideBar {...rest} title={title} />
					<MyRouter path={`/anime/${id}/${encodeURIComponent(slug)}`}>
						<Overview />
					</MyRouter>
					<MyRouter
						path={`/anime/${id}/${encodeURIComponent(slug)}#characters`}>
						<Characters />
					</MyRouter>
					<MyRouter path={`/anime/${id}/${encodeURIComponent(slug)}#staff`}>
						<Staff />
					</MyRouter>
					<MyRouter path={`/anime/${id}/${encodeURIComponent(slug)}#social`}>
						<Threads />
					</MyRouter>
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
		fallback: "blocking",
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
	padding: 2.5rem 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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

const CoverImage = styled(MyImage)`
	border-radius: 2px;
`;
