import styled from "styled-components";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import Link from "next/link";
import DataSet from "./DataSet";
import { css } from "styled-components";
import Tags from "./Tags";
import ExternalLinks from "./ExternalLinks";
import helpers from "helpers";

function SideBar(props) {
	const {
		rankings,
		format,
		duration,
		status,
		startDate,
		season,
		seasonYear,
		averageScore,
		meanScore,
		popularity,
		favourites,
		studios,
		staff,
		source,
		hashtag,
		genres,
		title,
		tags,
		externalLinks,
	} = props;

	console.log(props);
	return (
		<div
			css={`
				display: grid;
				grid-template-columns: 1fr;
				gap: 1.6rem;
			`}>
			<Ranking>
				<Link href={""}>
					<a className="rated">
						<AiFillStar className="rated-icon" />
						<p className="rated-text">
							#{rankings[0].rank} {rankings[0].context}
						</p>
					</a>
				</Link>
				<Link href={""}>
					<a className="popular">
						<AiFillHeart className="popular-icon" />
						<p className="popular-text">
							#{rankings[1].rank} {rankings[1].context}
						</p>
					</a>
				</Link>
			</Ranking>
			<Data>
				<DataSet type={"Format"}>
					<p className="value">{format}</p>
				</DataSet>
				{duration && (
					<DataSet type={"Episode Duration"}>
						<p className="value">{`${duration} min`}</p>
					</DataSet>
				)}
				<DataSet type={"Status"}>
					<p className="value">{helpers.capitalize(status)}</p>
				</DataSet>
				<DataSet type={"Start Date"}>
					<p className="value">{`${helpers.getMonth(startDate.month - 1)} ${
						startDate.day ? startDate.day : ""
					}, ${startDate.year}`}</p>
				</DataSet>
				<DataSet type={"Season"}>
					<p className="value">{`${helpers.capitalize(
						season
					)} ${seasonYear}`}</p>
				</DataSet>
				{averageScore && (
					<DataSet type={"Average Score"}>
						<p className="value">{averageScore}%</p>
					</DataSet>
				)}
				{meanScore && (
					<DataSet type={"Mean Score"}>
						<p className="value">{meanScore}%</p>
					</DataSet>
				)}
				<DataSet type={"Popularity"}>
					<p className="value">{popularity}</p>
				</DataSet>
				<DataSet type={"Favorites"}>
					<p className="value">{favourites}</p>
				</DataSet>
				<DataSet type={"Studios"}>
					{studios.edges.map((el) => (
						<Link
							key={el.node.id}
							href={`/studio/${el.node.id}/${encodeURIComponent(
								el.node.name
							)}`}>
							<a className="value link">{el.node.name}</a>
						</Link>
					))}
				</DataSet>
				<DataSet type={"Producers"}>
					{staff.edges.map((el) => (
						<Link
							key={el.node.id}
							href={`/studio/${el.node.id}/${encodeURIComponent(
								el.node.name.userPreferred
							)}`}>
							<a className="value link">{el.node.name.userPreferred}</a>
						</Link>
					))}
				</DataSet>
				<DataSet type={"Source"}>
					<p className="value">{helpers.capitalize(source)}</p>
				</DataSet>
				{hashtag && (
					<DataSet type={"Hashtag"}>
						<Link
							href={`https://twitter.com/search?q=${encodeURIComponent(
								hashtag
							)}&src=typd`}>
							<a className="value link" target="_blank">
								{hashtag}
							</a>
						</Link>
					</DataSet>
				)}
				<DataSet type={"Genres"}>
					{genres.map((el, i) => (
						<Link key={i} href={`/search/anime/${encodeURIComponent(el)}`}>
							<a className="value link">{el}</a>
						</Link>
					))}
				</DataSet>
				<DataSet type={"Romaji"}>
					<p className="value">{title.romaji}</p>
				</DataSet>
				<DataSet type={"English"}>
					<p className="value">{title.english}</p>
				</DataSet>
				<DataSet type={"Native"}>
					<p className="value">{title.native}</p>
				</DataSet>
			</Data>
			<Tags tags={tags} />
			<ExternalLinks externalLinks={externalLinks} />
		</div>
	);
}

export default SideBar;

/**
 * Styled Components
 */

const Ranking = styled.div`
	.rated,
	.popular {
		justify-content: space-evenly;
		display: flex;
		font-weight: 500;
		background: #fff;
		border-radius: 3px;
		padding: 8px 12px;
		width: 100%;
		color: #5c728a;
		transition: 0.15s;

		&:hover {
			color: #3db4f2;
		}
	}

	.rated {
		margin-bottom: 1.6rem;
	}

	.rated-text {
		font-size: 1.2rem;
	}
	.rated-icon {
		color: rgb(247, 191, 99);
	}
	.popular {
	}

	.popular-text {
		font-size: 1.2rem;
	}
	.popular-icon {
		color: rgb(232, 93, 117);
	}
`;

const Data = styled.div`
	background: #fff;
	border-radius: 3px;
	padding: 18px;
`;
