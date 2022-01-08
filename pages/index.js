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
						> div:not(:last-child) {
							margin-bottom: 5rem;
						}
					`}>
					<div
						css={`
							padding-top: 11.6rem;
						`}>
						<Link href="/">
							<a className="heading-3">
								<p>trending now</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaList mediaList={data.trending.media} />
					</div>

					<div>
						<Link href="/">
							<a className="heading-3">
								<p>Popular this season</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaList mediaList={data.season.media} />
					</div>

					<div>
						<Link href="/">
							<a className="heading-3">
								<p>Upcoming next season</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaList mediaList={data.nextSeason.media} />
					</div>

					<div>
						<Link href="/">
							<a className="heading-3">
								<p>All time popular</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaList mediaList={data.popular.media} />
					</div>

					<div>
						<Link href="/">
							<a className="heading-3">
								<p>Top 100 anime</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaList mediaList={data.top.media} layout="list" ranked={true} />
					</div>
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
