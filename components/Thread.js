import Link from "next/link";
import styled from "styled-components";
import MyImage from "./MyImage";
import { FaEye, FaComments } from "react-icons/fa";
var moment = require("moment");

function Thread({ thread }) {
	const { title, replyUser, repliedAt, viewCount, replyCount, categories, id } =
		thread;

	return (
		<Card>
			<div>
				<Link href={`/forum/threads/${id}`}>
					<a className="title link">{title}</a>
				</Link>
				<div className="info">
					<div>
						<FaEye className="icon" />
						<span>{viewCount}</span>
					</div>
					<div>
						<FaComments className="icon" />
						<span>{replyCount}</span>
					</div>
				</div>
			</div>

			<div className="footer">
				<div>
					{!!replyUser && (
						<>
							<Link href={`/user/${encodeURIComponent(replyUser.name)}`}>
								<a>
									<MyImage
										src={replyUser.avatar.large}
										width={25}
										height={25}
										className="avatar"
									/>
								</a>
							</Link>
							<Link href={`/user/${encodeURIComponent(replyUser.name)}`}>
								<a>{replyUser.name}</a>
							</Link>
						</>
					)}
					<Link href={"/"}>
						<a className="link">replied {moment(repliedAt * 1000).fromNow()}</a>
					</Link>
				</div>
				<p className="category">
					{categories.length === 1 ? "anime" : "realise discussion"}
				</p>
			</div>
		</Card>
	);
}

export default Thread;

const Card = styled.div`
	padding: 1.6rem;
	background: #fafafa;
	color: #5c728a;
	border-radius: 4px;
	> div:first-child,
	.info,
	.info div,
	.footer,
	.footer > div:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	> div:first-child {
	}
	.title {
		font-size: 1.4rem;
		color: inherit;
	}
	.info {
		font-size: 1.2rem;
		color: #9299a1;

		div:first-child {
			margin-right: 1rem;
		}
	}

	.icon {
		margin-right: 2px;
	}
	.footer {
		margin-top: 1rem;
		> div:first-child {
			justify-content: center;
		}

		> div > a:nth-child(2),
		> div > a:nth-child(3) {
			font-size: 1.3rem;
		}
		> div > a:nth-child(2) {
			margin-left: 1rem;
			margin-right: 3px;
			color: #3db4f2;
		}
		> div > a:nth-child(3) {
			color: #5c728a;
		}
	}
	.avatar {
		border-radius: 2px;
	}

	.category {
		font-size: 1.1rem;
		background: #00aaff;
		padding: 4px 8px;
		color: #fff;
		border-radius: 1rem;
		text-transform: lowercase;
	}
`;
