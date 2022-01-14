import MediaCards from "@/components/MediaCards";
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
						<Link href="/search/anime/trending">
							<a className="heading-3">
								<p>trending now</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaCards mediaCards={data.trending.media} />
					</div>

					<div>
						<Link href="/search/anime/this-season">
							<a className="heading-3">
								<p>Popular this season</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaCards mediaCards={data.season.media} />
					</div>

					<div>
						<Link href="/search/anime/next-season">
							<a className="heading-3">
								<p>Upcoming next season</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaCards mediaCards={data.nextSeason.media} />
					</div>

					<div>
						<Link href="/search/anime/popular">
							<a className="heading-3">
								<p>All time popular</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaCards mediaCards={data.popular.media} />
					</div>

					<div>
						<Link href="/search/anime/top-100">
							<a className="heading-3">
								<p>Top 100 anime</p>
								<p>View all</p>
							</a>
						</Link>
						<MediaCards mediaCards={data.top.media} view="list" isRanked />
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
