import Link from "next/link";
import MyImage from "./MyImage";
import { Card } from "./RoleCard";

function StaffMemberStaffMediaCard({ staffMedia }) {
	const { id, type, title, coverImage } = staffMedia.node;

	return (
		!!staffMedia.node && (
			<Card>
				<Link
					href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
						title.userPreferred
					)}`}>
					<a className="cover">
						<MyImage src={coverImage.large} layout="fill" />
					</a>
				</Link>

				<div className="titles">
					<Link
						href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
							title.userPreferred
						)}`}>
						<a className="title">{title.userPreferred}</a>
					</Link>
					<div className="relations">
						<Link
							href={`/${type.toLowerCase()}/${id}/${encodeURIComponent(
								title.userPreferred
							)}`}>
							<a className="relation-title">{staffMedia.staffRole}</a>
						</Link>
					</div>
				</div>
			</Card>
		)
	);
}

export default StaffMemberStaffMediaCard;
