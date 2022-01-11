import { getGenres } from "../graphql";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import helpers from "../helpers/index";
import MySelect from "./MySelect";
import TextInput from "./TextInput";
import { FaSlidersH, FaThList, FaTh, FaThLarge } from "react-icons/fa";
import styled from "styled-components";

const getLabel = (str) => {
	const obj = {
		TV: "TV Show",
		TV_SHORT: "TV Short",
		OVA: "OVA",
		ONA: "ONA",
	};

	return obj[str] ? obj[str] : helpers.capitalize(str);
};

const getValue = (el) => {
	if (!el) return;

	if (Array.isArray(el)) {
		return el.map((val) => ({ value: val, label: getLabel(val) }));
	}

	return { value: el, label: getLabel(el) };
};

let years = [
	{ value: new Date().getFullYear(), label: new Date().getFullYear() },
];

while (true) {
	years.push({
		value: years[years.length - 1].value - 1,
		label: years[years.length - 1].value - 1,
	});

	if (years[years.length - 1].value === 1940) break;
}

const seasons = [
	{ value: "WINTER", label: "Winter" },
	{ value: "SPRING", label: "Spring" },
	{ value: "SUMMER", label: "Summer" },
	{ value: "FALL", label: "Fall" },
];

const formats = [
	{ value: "TV", label: "TV Show" },
	{ value: "MOVIE", label: "Movie" },
	{ value: "TV_SHORT", label: "TV Short" },
	{ value: "SPECIAL", label: "Special" },
	{ value: "OVA", label: "OVA" },
	{ value: "ONA", label: "ONA" },
	{ value: "MUSIC", label: "Music" },
];

function Filters({ handleClick, view, mediaType }) {
	const { isLoading, data } = useQuery("genres", getGenres);
	const router = useRouter();
	const [toggleSelect, setToggleSelect] = useState(false);
	const [screenWidth, setScreenWidth] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		handleResize();

		window.addEventListener("resize", handleResize);
	}, []);

	useEffect(() => setToggleSelect(screenWidth > 1040), [screenWidth]);

	return (
		<div>
			<div
				css={`
					display: grid;
					grid-template-columns: repeat(24, 1fr);
					align-items: end;
					gap: 2.4rem;
					justify-content: center;
					grid-auto-flow: column;
					margin-bottom: 2.4rem;
				`}>
				<TextInput value={router.query.search} />
				{toggleSelect && (
					<div
						css={`
							grid-column: 6/24;
							@media only screen and (max-width: 1040px) {
								grid-column: 1/25;
							}

							display: grid;
							gap: 2.4rem;
							grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
							align-items: center;
						`}>
						<MySelect
							label="Genres"
							name="genres"
							options={
								!isLoading && data.genres.map((g) => ({ value: g, label: g }))
							}
							value={getValue(router.query.genres)}
							isMulti
							closeMenuOnSelect={false}
						/>
						<MySelect
							label="Year"
							name="year"
							options={years}
							value={getValue(router.query.year)}
						/>
						<MySelect
							label="Season"
							name="season"
							options={seasons}
							value={getValue(router.query.season)}
							isDisabled={mediaType === "MANGA"}
						/>
						<MySelect
							label="Format"
							name="format"
							options={formats}
							value={getValue(router.query.format)}
							isMulti
							closeMenuOnSelect={false}
							isDisabled={mediaType === "MANGA"}
						/>
					</div>
				)}
				<button
					disabled={screenWidth > 1040}
					onClick={() => setToggleSelect(!toggleSelect)}
					css={`
						grid-column: 24/25;
						border: 0;
						background: rgb(251, 251, 251);
						box-shadow: 0 14px 30px rgba(103, 132, 187, 0.1),
							0 4px 4px rgba(103, 132, 187, 0.04);
						fontsize: 1.8rem;
						border-radius: 4px;
						width: 3.8rem;
						height: 3.8rem;
						color: rgb(173, 192, 210);
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
					`}>
					<FaSlidersH />
				</button>
			</div>

			<SecondaryFilters>
				<div className="active-filters"></div>
				<div>
					<div className="sort"></div>
					<FaTh
						className="list-icon"
						onClick={() => handleClick("small")}
						css={view === "small" && `color: rgb(116, 136, 153) !important;`}
					/>
					<FaThLarge
						className="list-icon"
						onClick={() => handleClick("medium")}
						css={view === "medium" && `color: rgb(116, 136, 153) !important;`}
					/>
					<FaThList
						className="list-icon"
						onClick={() => handleClick("list")}
						css={view === "list" && `color: rgb(116, 136, 153) !important;`}
					/>
				</div>
			</SecondaryFilters>
		</div>
	);
}

export default Filters;

/**
 * Styled Components
 */

const SecondaryFilters = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2.4rem;

	.active-filters {
		background: red;
	}

	> div:nth-child(2) {
	}

	.list-icon {
		cursor: pointer;
		color: rgb(173, 192, 210);
		transition: color 0.3s ease;
		font-size: 1.8rem;

		&:not(:last-child) {
			margin-right: 1rem;
		}

		&:hover {
			color: rgb(116, 136, 153);
		}
	}
`;
