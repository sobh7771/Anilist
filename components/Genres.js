import Link from "next/link";
import chroma from "chroma-js";

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
							color: ${chroma(color || "#d3e7f3")
								.brighten()
								.hex()} !important;
							background: ${color || "#d3e7f3"};
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
