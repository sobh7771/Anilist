import { API_URL } from "config";
import request, { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";
import MyImage from "./MyImage";
import ProgressBar from "./ProgressBar";
import { FaHeart } from "react-icons/fa";

const query = gql`
	query staff($id: Int) {
		Staff(id: $id) {
			id
			name {
				first
				middle
				last
				full
				native
				userPreferred
				alternative
			}
			image {
				large
			}
			description
			favourites
			isFavourite
			age
			gender
			yearsActive
			homeTown
			bloodType
			primaryOccupations
			dateOfBirth {
				year
				month
				day
			}
			dateOfDeath {
				year
				month
				day
			}
			language: languageV2
		}
	}
`;

const getStaffMemberPersonalInfo = ({ queryKey }) =>
	request(API_URL, query, { id: queryKey[0] });

function StaffMemberPersonalInfo() {
	const router = useRouter();
	const { id, name } = router.query;

	// const { isLoading, isError, data } = useQuery(id, getStaffMemberPersonalInfo);

	// if (isLoading) {
	// 	return <ProgressBar />;
	// }

	// if (isError) {
	// 	return <div>Something went wrong!</div>;
	// }

	return (
		<PersonalInfo>
			<div className="header">
				<div className="container">
					<div className="profile-pic-wrapper">
						<MyImage
							src={`https://s4.anilist.co/file/anilistcdn/staff/large/n95118-oOElrn1aSaiC.png`}
							width={230}
							height={345}
							className="profile-pic"
						/>
					</div>
					<div className="names">
						<p className="name">Hiroshi Kamiya</p>
						<p className="name-alt">
							神谷浩史, HiroC (ヒロC), Kousuke Kanda (神田浩介), Kamiyan
						</p>
					</div>
					<div className="actions">
						<div className="favorite">
							<FaHeart />
							<p className="count">14.4k</p>
						</div>
					</div>
				</div>
			</div>
			<div className="body">
				<div>Hello,there</div>
				<div>Hello, there</div>
			</div>
		</PersonalInfo>
	);
}

export default StaffMemberPersonalInfo;

/**
 * Styled Components
 */

const PersonalInfo = styled.div`
	.header {
		background-image: linear-gradient(
			180deg,
			rgb(251, 251, 251) 0 50%,
			transparent 50%
		);
		padding-bottom: 30px;
		padding-top: 11.6rem;
	}

	.header > div {
		display: grid;
		grid-template-columns: max-content auto max-content;
	}

	.profile-pic-wrapper {
		background: red;
		grid-row: auto;
		margin: 0 auto;

		@media only screen and (max-width: 700px) {
			grid-row: 2;
			grid-column: 1 / span 3;
		}
	}
	.names {
		background: green;
	}
	.actions {
		background: blue;
	}
`;

/**
 * 	



	
	display: grid;
	grid-template-columns: 1fr 3fr;
	padding-top: 11.6rem;

	> div {
		&:nth-child(1) {
			background: red;
		}
		&:nth-child(2) {
			background: green;
		}
		&:nth-child(3) {
			background: blue;
			grid-column: 2/3;

			@media only screen and (max-width: 700px) {
				grid-column: auto;
			}
		}
	}
 */
