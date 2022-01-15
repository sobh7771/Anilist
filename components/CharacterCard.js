import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import MyImage from "./MyImage";

function CharacterCard({ id, name, image }) {
	const router = useRouter();

	const type =
		router.pathname.split("/")[router.pathname.split("/").length - 1];
	return (
		<Card key={id}>
			<Link href={`/${type}/${id}/${encodeURIComponent(name.userPreferred)}`}>
				<a>
					<MyImage
						src={image.large}
						width={185}
						height={265}
						className="cover"
					/>
					<p className="name">{name.userPreferred}</p>
				</a>
			</Link>
		</Card>
	);
}

export default CharacterCard;

/**
 * Styled Components
 */

const Card = styled.div`
	&:hover .name {
		color: rgb(81, 97, 112);
	}

	.cover {
		background: rgba(221, 230, 238, 0.8);
		border-radius: 4px;
		box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
			0 4px 4px rgba(103, 132, 187, 0.05);
	}

	.name {
		color: rgb(116, 136, 153);
		font-size: 1.4rem;
		font-weight: 600;
		margin-top: 10px;
		transition: color 0.2s ease;
	}
`;
