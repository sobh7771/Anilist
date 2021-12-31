import Link from "next/link";

function Genres({ genres, color, layout }) {
	let allowable;

	if (layout === "grid") {
		allowable = [...genres].splice(0, 3);
	} else {
		allowable = genres;
	}

	return (
		<div>
			{allowable.map((genre, i) => (
				<Link href="#" key={i}>
					<a
						css={`
							color: #fff5f8 !important;
							background: ${color};
							margin-right: 0.8rem;
							padding: 3px 1rem;
							border-radius: 1rem;
							font-size: 1.1rem !important;
							margin-bottom: 0 !important;
						`}>
						{genre}
					</a>
				</Link>
			))}
		</div>
	);
}

export default Genres;
