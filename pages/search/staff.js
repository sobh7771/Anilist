import CharacterCards from "@/components/CharacterCards";
import InfiniteCharacterCards from "@/components/InfiniteCharacterCards";
import Layout from "@/components/Layout";
import TextInput from "@/components/TextInput";
import ProgressBar from "@/components/ProgressBar";
import { searchCharacters } from "@/graphql/index";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";
import helpers from "helpers";

function SearchStaff() {
	const router = useRouter();
	const { isLoading, isError, data } = useQuery(
		[{ ...router.query }],
		searchCharacters,
		{
			enabled: helpers.isEmpty(router.query),
		}
	);

	if (isError) {
		return <>Something went wrong!</>;
	}

	return (
		<Layout title="Search Staff">
			<div className="container">
				<div
					css={`
						font-family: Overpass;
						padding-top: 11.6rem;

						> a {
							display: flex;
							justify-content: space-between;
							font-weight: 700;
							margin-bottom: 2rem;
						}

						> a h3 {
							color: #647380;
							font-size: 1.6rem;
							text-transform: uppercase;
							letter-spacing: 0.03em;
						}

						.expand {
							color: #8ba0b2;
							font-size: 1.2rem;
						}
					`}>
					<Title>Search Staff</Title>
					<div
						css={`
							margin-bottom: 2.5rem;
							width: 34.4rem;

							@media only screen and (max-width: 1040px) {
								width: 100%;
							}
						`}>
						<TextInput />
					</div>
					{isLoading ? (
						<ProgressBar />
					) : (
						<>
							<CharacterCards
								characters={data && data.staffBirthdays?.staff}
								title="Birthdays"
								link="/search/staff?isBirthday=true&sort=FAVOURITES_DESC&sort=ID_DESC"
							/>
							<CharacterCards
								characters={data && data.staff?.staff}
								title="Most Favoured Staff"
								link="/search/staff?sort=FAVOURITES_DESC"
							/>
						</>
					)}

					<InfiniteCharacterCards />
				</div>
			</div>
		</Layout>
	);
}

export default SearchStaff;

/**
 * Styled Components
 */

const Title = styled.p`
	color: #647380;
	font-size: 2.8rem;
	padding-bottom: 3rem;
	font-weight: 800;
`;
