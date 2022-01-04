function Trailer({ trailer }) {
	return (
		trailer && (
			<>
				<h2 className="mb-1">Trailer</h2>
				<div
					css={`
						display: grid;
						grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
						grid-column-gap: 3rem;
						grid-row-gap: 1.5rem;
					`}>
					<iframe
						css={`
							width: 100%;
							height: 23rem;
							border-radius: 4px;
							border: 0;
						`}
						src={`https://www.youtube.com/embed/${trailer.id}`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen></iframe>
				</div>
			</>
		)
	);
}

export default Trailer;
