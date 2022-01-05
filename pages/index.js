import MediaList from "@/components/MediaList";
import { getHomeQuery } from "../graphql";
import helpers from "helpers";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home({ data }) {
	return (
		<Layout>
			<div className="container">
				<div
					css={`
						margin-bottom: 5rem;
						padding-top: 11.6rem;
					`}>
					<Link href="/">
						<a
							css={`
								display: flex;
								justify-content: space-between;
								color: rgb(100, 115, 128);
								font-weight: 500;
							`}>
							<p
								css={`
									letter-spacing: 0.03em;
									text-transform: uppercase;
									margin-bottom: 20px;
								`}>
								trending now
							</p>
							<p>View all</p>
						</a>
					</Link>
					<MediaList mediaList={data.trending.media} />
				</div>

				<div
					css={`
						margin-bottom: 5rem;
					`}>
					<Link href="/">
						<a
							css={`
								display: flex;
								justify-content: space-between;
								color: rgb(100, 115, 128);
								font-weight: 500;
							`}>
							<p
								css={`
									letter-spacing: 0.03em;
									text-transform: uppercase;
									margin-bottom: 20px;
								`}>
								Popular this season
							</p>
							<p>View all</p>
						</a>
					</Link>
					<MediaList mediaList={data.season.media} />
				</div>

				<div
					css={`
						margin-bottom: 5rem;
					`}>
					<Link href="/">
						<a
							css={`
								display: flex;
								justify-content: space-between;
								color: rgb(100, 115, 128);
								font-weight: 500;
							`}>
							<p
								css={`
									letter-spacing: 0.03em;
									text-transform: uppercase;
									margin-bottom: 20px;
								`}>
								Upcoming next season
							</p>
							<p>View all</p>
						</a>
					</Link>
					<MediaList mediaList={data.nextSeason.media} />
				</div>

				<div
					css={`
						margin-bottom: 5rem;
					`}>
					<Link href="/">
						<a
							css={`
								display: flex;
								justify-content: space-between;
								color: rgb(100, 115, 128);
								font-weight: 500;
							`}>
							<p
								css={`
									letter-spacing: 0.03em;
									text-transform: uppercase;
									margin-bottom: 20px;
								`}>
								All time popular
							</p>
							<p>View all</p>
						</a>
					</Link>
					<MediaList mediaList={data.popular.media} />
				</div>

				<div
					css={`
						margin-bottom: 5rem;
					`}>
					<Link href="/">
						<a
							css={`
								display: flex;
								justify-content: space-between;
								color: rgb(100, 115, 128);
								font-weight: 500;
							`}>
							<p
								css={`
									letter-spacing: 0.03em;
									text-transform: uppercase;
									margin-bottom: 20px;
								`}>
								Top 100 anime
							</p>
							<p>View all</p>
						</a>
					</Link>
					<MediaList mediaList={data.top.media} layout="list" ranked={true} />
				</div>
			</div>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const d = new Date();
	const season = helpers.getSeason(helpers.getMonth(d.getMonth()));
	const year = d.getFullYear();

	const vars = {
		seasonYear: year,
		nextYear: year,
		season: season.toUpperCase(),
		nextSeason: helpers.getNextSeason(season).toUpperCase(),
	};

	const data = await getHomeQuery(vars);

	return {
		props: {
			data,
		},
	};
};
