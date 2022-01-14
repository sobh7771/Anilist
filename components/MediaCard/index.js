import helpers from "helpers";
import usePosition from "hooks/use-position";
import moment from "moment";
import Link from "next/link";
import MyImage from "../MyImage";
import { Card, CardWrapper, Content, Genres, Overlay, Studios } from "./styles";

function MediaCard(props) {
	const { ref, position } = usePosition();
	const { view, isRanked, rank, mediaCard } = props;
	const {
		id,
		type,
		title,
		coverImage,
		nextAiringEpisode,
		format,
		averageScore,
		episodes,
		genres,
		startDate,
		endDate,
		studios,
		season,
		description,
		popularity,
		status,
		chapters,
	} = mediaCard;

	coverImage.color = coverImage.color || "#2c76a0";

	const displayRank = isRanked && (view === "list" || view === "small");

	return (
		<CardWrapper view={view} color={coverImage.color}>
			{displayRank && (
				<p className="rank">
					<span className="hash">#</span>
					{rank}
				</p>
			)}
			<Card view={view} ref={ref}>
				<div>
					<Link
						href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
							title.userPreferred
						)}`}>
						<a className="cover">
							<MyImage src={coverImage.large} layout="fill" />
						</a>
					</Link>

					<Overlay view={view} color={coverImage.color}>
						<Link
							href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
								title.userPreferred
							)}`}>
							<a className="overlay-title">{title.userPreferred}</a>
						</Link>
						<div className="overlay-studio">
							<Studios view={view} color={coverImage.color}>
								{studios.edges.map((s) => (
									<Link
										href={`/studio/${s.node.id}/${encodeURIComponent(
											s.node.name
										)}`}
										key={s.node.id}>
										<a>{s.node.name}</a>
									</Link>
								))}
							</Studios>
						</div>
					</Overlay>
				</div>
				<Content position={position} view={view} color={coverImage.color}>
					{/* Start body */}
					<div className="custom-scrollbar body">
						<div className="header">
							<div>
								{view === "list" ? (
									<Link
										href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
											title.userPreferred
										)}`}>
										<a className="title">{title.userPreferred}</a>
									</Link>
								) : (
									<p className="date">
										{nextAiringEpisode ? (
											<>
												Ep {nextAiringEpisode.episode} airing{" "}
												{moment(nextAiringEpisode.airingAt * 1000).fromNow()}
											</>
										) : (season || endDate) && startDate.year ? (
											<>
												{helpers.capitalize(season) || `${endDate.year} -`}{" "}
												{startDate.year}
											</>
										) : (
											<>Publishing since {startDate.year}</>
										)}
									</p>
								)}

								<Studios view={view} color={coverImage.color}>
									{studios.edges.map((s) => s.node.name).join(" ")}
								</Studios>
								<div className="typings">
									<span>{helpers.getFormat(format)}</span>
									{(episodes || chapters) && (
										<>
											<span> • </span>
											{episodes && <span>{episodes} episodes</span>}
											{chapters && <span>{chapters} chapters</span>}
										</>
									)}
								</div>
							</div>
							<div>
								{isRanked && view === "medium" ? (
									<p className="rank">
										<span className="hash">#</span>
										{rank}
									</p>
								) : (
									!!averageScore && (
										<div className="score">
											<p className="percentage">{averageScore}%</p>
										</div>
									)
								)}
							</div>
						</div>
						<p
							className="description"
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						/>
					</div>
					{/* End body */}

					{/* Start footer */}
					<div className="footer">
						<Genres view={view} color={coverImage.color}>
							{genres.map((genre, i) => (
								<Link
									href={`search/${type.toLowerCase()}/${encodeURIComponent(
										genre
									)}`}
									key={i}>
									<a className="genre">{genre}</a>
								</Link>
							))}
						</Genres>
					</div>
					{/* End footer */}

					<p className="list-score percentage">{averageScore}%</p>
					<p className="list-score">{popularity} users</p>
					<p className="list-format percentage">{helpers.getFormat(format)}</p>
					<p className="list-format">
						{episodes && <span>{episodes} episodes</span>}
						{chapters && <span>{chapters} chapters</span>}
					</p>
					<p className="list-date percentage">
						{(season || endDate?.year) && startDate.year ? (
							<>
								{helpers.capitalize(season) || `${endDate.year} -`}{" "}
								{startDate.year}
							</>
						) : (
							<>Publishing since {startDate.year}</>
						)}
					</p>
					<p className="list-date">{helpers.capitalize(status)}</p>
				</Content>
			</Card>
		</CardWrapper>
	);
}

export default MediaCard;
