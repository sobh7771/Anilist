import styled from "styled-components";
import Select from "react-select";
import { FaSort } from "react-icons/fa";
import { useRouter } from "next/router";

const styles = {
	control(provided, state) {
		return {
			cursor: "pointer",
		};
	},
	singleValue(provided, state) {
		return {
			...provided,
			color: "rgb(139,160,178)",
			fontSize: "1.3rem",
			fontWeight: 600,
			transition: " color 0.3s ease",
			":hover": {
				color: " rgb(116, 136, 153)",
			},
		};
	},
	indicatorsContainer() {
		return {
			display: "none",
		};
	},
	option: (provided, state) => ({
		...provided,
		transition: "background .2s ease-in-out,color .2s ease-in-out",
		cursor: "pointer",
		borderRadius: "4px",
		":hover": {
			color: "rgb(61,180,242)",
			background: "rgba(237,241,245,.6)",
		},
	}),
	menu: (provided, state) => ({
		...provided,
		border: 0,
		background: "rgb(251,251,251)",
		boxShadow:
			"0 14px 30px rgba(103,132,187,.1),0 4px 4px rgba(103,132,187,.04)",
		fontFamily: "Overpass",
		fontSize: "1.3rem",
		color: "#5c728a",
		fontWeight: "600",
		width: "max-content",
	}),
	menuList: (provided, state) => ({
		...provided,
		":hover::-webkit-scrollbar": {
			display: "block",
		},
		padding: "1rem",
		"::-webkit-scrollbar": {
			width: "6px",
		},
		"::-webkit-scrollbar-track": {
			transition: "0.2s linear",
			":hover": {
				backgroundColor: " #eee",
				opacity: ".9",
			},
		},
		"::-webkit-scrollbar-thumb": {
			transition: "background-color .2s linear",
			background: "#aaa",
			borderRadius: "6px",
			":hover": {
				backgroundColor: " #999",
			},
		},
	}),
};

const getValue = (el, options) => {
	if (!el) return;

	if (Array.isArray(el)) {
		return el.map((val) => options.find((option) => option.value === val));
	}

	return options.find((option) => option.value === el);
};

function MiniSelect({ options, defaultValue }) {
	const router = useRouter();

	const handleChange = (selected, { name }) => {
		let query;

		if (Array.isArray(selected)) {
			query = { ...router.query, [name]: selected.map((el) => el.value) };
		} else {
			query = { ...router.query, [name]: selected?.value };
		}

		router.push({ query: JSON.parse(JSON.stringify(query)) }, null, {
			shallow: true,
			scroll: false,
		});
	};

	return (
		<StyledMiniSelect>
			<FaSort />
			<Select
				options={options}
				onChange={handleChange}
				value={getValue(router.query.sort, options)}
				defaultValue={defaultValue}
				name="sort"
				styles={styles}
				isSearchable={false}
			/>
		</StyledMiniSelect>
	);
}

export default MiniSelect;

const StyledMiniSelect = styled.div`
	display: flex;
	align-items: center;
	transition: color 0.3s ease;

	&:hover {
		color: rgb(116, 136, 153);
	}
`;
