import Link from "next/link";
import MyImage from "./MyImage";
import { Card } from "./RoleCard";

function CharacterCharacterMediaRoleCard({ edge }) {
	const { node, voiceActorRoles } = edge;

	const voiceActor = voiceActorRoles[0]?.voiceActor;

	console.log(edge.node);
	return (
		!!node && (
			<Card>
				<Link
					href={`/${node.type.toLowerCase()}/${node.id}/${encodeURIComponent(
						node.title.userPreferred
					)}`}>
					<a className="cover">
						<MyImage src={node.coverImage.large} layout="fill" />
					</a>
				</Link>

				<div className="titles">
					<Link
						href={`/${node.type.toLowerCase()}/${node.id}/${encodeURIComponent(
							node.title.userPreferred
						)}`}>
						<a className="title">{node.title.userPreferred}</a>
					</Link>
					{!!voiceActor && (
						<div className="relations">
							<Link
								href={`/staff/${voiceActor.id}/${encodeURIComponent(
									voiceActor.name.userPreferred
								)}`}>
								<a className="relation-title">
									{voiceActor.name.userPreferred}
								</a>
							</Link>
							<Link
								href={`/staff/${voiceActor.id}/${encodeURIComponent(
									voiceActor.name.userPreferred
								)}`}>
								<a className="relation-img">
									<MyImage src={voiceActor.image.large} layout="fill" />
								</a>
							</Link>
						</div>
					)}
				</div>
			</Card>
		)
	);
}

export default CharacterCharacterMediaRoleCard;
