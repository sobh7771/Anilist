import CharacterCards from "@/components/CharacterCards";
import InfiniteCharacterCards from "@/components/InfiniteCharacterCards";
import Layout from "@/components/Layout";
import TextInput from "@/components/TextInput";
import ProgressBar from "@/components/ProgressBar";
import { infiniteSearchCharacters, searchCharacters } from "@/graphql/index";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";
import helpers from "helpers";

function SearchCharacters() {
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
		<Layout title="Search Characters">
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
					<Title>Search Characters</Title>
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
								characters={data && data.characterBirthdays?.characters}
								title="Birthdays"
								link="/search/characters?isBirthday=true&sort=FAVOURITES_DESC&sort=ID_DESC"
							/>
							<CharacterCards
								characters={data && data.characters?.characters}
								title="Most Favoured Characters"
								link="/search/characters?sort=FAVOURITES_DESC"
							/>
						</>
					)}

					<InfiniteCharacterCards queryFn={infiniteSearchCharacters} />
				</div>
			</div>
		</Layout>
	);
}

export default SearchCharacters;

/**
 * Styled Components
 */

const Title = styled.p`
	color: #647380;
	font-size: 2.8rem;
	padding-bottom: 3rem;
	font-weight: 800;
`;
