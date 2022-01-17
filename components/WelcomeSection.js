import Link from "next/link";
import MediaCards from "./MediaCards";

function WelcomeSection({ link, headline, ...rest }) {
	return (
		<section className="welcome-section">
			<Link href={link}>
				<a className="heading-3">
					<p>{headline}</p>
					<p>View all</p>
				</a>
			</Link>
			<MediaCards {...rest} />
		</section>
	);
}

export default WelcomeSection;
