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
		type,
	} = props;

	return (
		<div
			css={`
				display: grid;
				grid-template-columns: 1fr;
				gap: 1.6rem;
			`}>
			<Ranking>
				{rankings[0] ? (
					<Link href={""}>
						<a className="rated">
							<AiFillStar className="rated-icon" />
							<p className="rated-text">
								#{rankings[0].rank} {rankings[0].context}
							</p>
						</a>
					</Link>
				) : (
					<></>
				)}
				{rankings[1] ? (
					<Link href={""}>
						<a className="popular">
							<AiFillHeart className="popular-icon" />
							<p className="popular-text">
								#{rankings[1]?.rank} {rankings[1]?.context}
							</p>
						</a>
					</Link>
				) : (
					<></>
				)}
			</Ranking>
			<Data>
				<DataSet type={"Format"} value={format} />
				<DataSet type={"Episode Duration"} value={duration} />
				<DataSet type={"Status"} value={helpers.capitalize(status)} />
				{startDate.day || startDate.month || startDate.seasonYear ? (
					<DataSet
						type={"Start Date"}
						value={`${helpers.getDate(
							startDate.day,
							helpers.getMonth(startDate.month - 1),
							startDate.year
						)}`}
					/>
				) : (
					""
				)}
				{season || seasonYear ? (
					<DataSet
						type={"Season"}
						value={`${helpers.getDate(
							null,
							helpers.capitalize(season),
							seasonYear
						)}`}
					/>
				) : (
					""
				)}
				<DataSet type={"Average Score"} value={averageScore} />
				<DataSet type={"Mean Score"} value={meanScore} />
				<DataSet type={"Popularity"} value={popularity} />
				<DataSet type={"Favorites"} value={favourites} />
				{!!studios.edges.length && (
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
				)}
				{!!staff.edges.length && (
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
				)}
				<DataSet type={"Source"} value={helpers.capitalize(source)} />
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
				{genres.length ? (
					<DataSet type={"Genres"}>
						{genres.map((el, i) => (
							<Link
								key={i}
								href={`/search/${type.toLowerCase()}?genres=${encodeURIComponent(
									el
								)}&sort=SCORE_DESC`}>
								<a className="value link">{el}</a>
							</Link>
						))}
					</DataSet>
				) : (
					""
				)}
				<DataSet type={"Romaji"} value={title.romaji} />
				<DataSet type={"English"} value={title.english} />
				<DataSet type={"Native"} value={title.native} />
			</Data>
			<Tags tags={tags} />
			<ExternalLinks externalLinks={externalLinks} />
		</div>
	);
}

SideBar.defaultProps = {
	type: "ANIME",
};

export default SideBar;

/**
 * Styled Components
 */

const Ranking = styled.div`
	height: max-content;
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
