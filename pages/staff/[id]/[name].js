import Layout from "@/components/Layout";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import MyImage from "@/components/MyImage";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { API_URL } from "config";
import StaffMemberPersonalInfoDataPoint from "@/components/StaffMemberPersonalInfoDataPoint";
import helpers from "helpers";
import MiniSelect from "@/components/MiniSelect";
import InfiniteStaffMemberCharacterMedia from "@/components/InfiniteStaffMemberCharacterMedia";
import InfiniteStaffMemberStaffMedia from "@/components/InfiniteStaffMemberStaffMedia";

function StaffMemberPage({ personalInfo }) {
	const {
		name,
		image,
		favourites,
		age,
		dateOfBirth,
		yearsActive,
		homeTown,
		bloodType,
		primaryOccupations,
	} = personalInfo;

	return (
		<Layout>
			<PersonalInfo>
				<div className="header">
					<div className="container">
						<div className="names">
							<Name>{name.userPreferred}</Name>
							<NameAlt>{name.native}</NameAlt>
						</div>
						<div className="actions">
							<Favorite>
								<FaHeart />
								<p className="count">{favourites}</p>
							</Favorite>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="body">
						<ProfilePic>
							<MyImage src={image.large} layout="fill" />
						</ProfilePic>
						<div className="description">
							<StaffMemberPersonalInfoDataPoint
								label="Birth"
								value={`${helpers.getMonth(dateOfBirth.month - 1)} ${
									dateOfBirth.day
								}, ${dateOfBirth.year}`}
							/>
							<StaffMemberPersonalInfoDataPoint label="Age" value={age} />
							<StaffMemberPersonalInfoDataPoint
								label="Years Active"
								value={yearsActive}
							/>
							<StaffMemberPersonalInfoDataPoint
								label="Hometown"
								value={homeTown}
							/>
							<StaffMemberPersonalInfoDataPoint
								label="Blood Type"
								value={bloodType}
							/>
							<StaffMemberPersonalInfoDataPoint
								label="Occupations"
								value={primaryOccupations}
							/>
						</div>
					</div>
				</div>
			</PersonalInfo>

			<div className="container">
				<div
					css={`
						display: flex;
						justify-content: end;
						margin-bottom: 3rem;
					`}>
					<MiniSelect
						defaultValue={{ label: "Newest", value: "START_DATE_DESC" }}
						options={[
							{ label: "Popularity", value: "POPULARITY_DESC" },
							{ label: "Average Score", value: "SCORE_DESC" },
							{ label: "Favorites", value: "FAVOURITES_DESC" },
							{ label: "Newest", value: "START_DATE_DESC" },
							{ label: "Oldest", value: "START_DATE" },
							{ label: "Title", value: "TITLE_ROMAJI" },
						]}
					/>
				</div>
				<InfiniteStaffMemberCharacterMedia />
				<InfiniteStaffMemberStaffMedia />
			</div>
		</Layout>
	);
}

/**
 * Query functions
 **/

const getStaffMemberStaticPaths = () =>
	request(
		API_URL,
		gql`
			{
				Page(page: 1, perPage: 5) {
					staff {
						id
						name {
							userPreferred
						}
					}
				}
			}
		`
	);

const getStaffMemberPersonalInfo = (id) =>
	request(
		API_URL,
		gql`
			query staff($id: Int) {
				Staff(id: $id) {
					name {
						userPreferred
						native
					}
					image {
						large
					}
					favourites
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
		`,
		{ id }
	);

/**
 * Data fetching
 **/
export const getStaticPaths = async () => {
	const data = await getStaffMemberStaticPaths();

	const paths = data.Page.staff.map((m) => ({
		params: { id: m.id + "", name: m.name.userPreferred },
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params }) => {
	const data = await getStaffMemberPersonalInfo(params.id);

	return {
		props: {
			personalInfo: data.Staff,
		},
	};
};

export default StaffMemberPage;

/**
 * Styled Components
 */

const PersonalInfo = styled.div`
	font-family: Overpass;
	.header {
		background: rgb(251, 251, 251);
		padding-top: 11.6rem;
		padding-bottom: 3rem;

		@media only screen and (max-width: 700px) {
			padding-bottom: 10rem;
		}

		> div {
			padding-left: 30.4rem;
			display: flex;
			justify-content: space-between;
			position: relative;
			@media only screen and (max-width: 700px) {
				padding-left: 0;
				justify-content: center;
			}
		}
	}

	.actions {
		@media only screen and (max-width: 700px) {
			position: absolute;
			top: 0;
			right: 1.6rem;
		}
	}

	.names {
		@media only screen and (max-width: 700px) {
			text-align: center;
		}
	}

	.body {
		display: flex;

		@media only screen and (max-width: 700px) {
			flex-direction: column;
		}
	}

	.description {
		padding-left: 5.8rem;
		margin-top: 1.8rem;

		@media only screen and (max-width: 700px) {
			margin-top: 0;
			padding-left: 0;
		}
	}
`;

const Favorite = styled.button`
	display: flex;
	align-items: center;
	color: #fff;
	font-weight: 800;
	padding: 0 1.4rem;
	height: 3.5rem;
	background: #ec294b;
	font-size: 1.4rem;
	border-radius: 5px;
	border: 0;
	cursor: pointer;

	.count {
		padding-left: 1rem;
	}
`;

const Name = styled.p`
	color: #647380;
	font-size: 2.8rem;
	font-weight: 800;
	letter-spacing: 0.03em;
	margin-top: 10px;
`;
const NameAlt = styled.p`
	color: #8ba0b2;
	font-size: 1.4rem;
`;
const ProfilePic = styled.figure`
	position: relative;
	transform: translateY(-25%);
	width: 230px;
	height: 345px;
	border-radius: 5px;
	box-shadow: 0 14px 30px rgba(103, 132, 187, 0.15),
		0 4px 4px rgba(103, 132, 187, 0.05);
	overflow: hidden;

	@media only screen and (max-width: 700px) {
		margin: 0 auto;
		width: 210px;
		height: 315px;
	}
`;
