import { useRouter } from "next/router";
import Select from "react-select";

const customStyles = {
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
	control: (provided, state) => ({
		...provided,
		border: 0,
		background: "rgb(251,251,251)",
		boxShadow:
			"0 14px 30px rgba(103,132,187,.1),0 4px 4px rgba(103,132,187,.04)",
		fontFamily: "Overpass",
		fontSize: "1.3rem",
		color: "#5c728a",
		fontWeight: "600",
	}),
	singleValue: (provided, state) => {
		return {
			...provided,
			color: !state.isMulti ? "#3db4f2" : "",
			fontWeight: !state.isMulti && "600",
		};
	},
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

function MySelect({ label, name, options, value, ...rest }) {
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
		});
	};

	return (
		<div>
			<p
				css={`
					margin-bottom: 1rem;
					font-size: 1.5rem;
					font-weight: 600;
					font-family: Overpass;
					color: #516170;
				`}>
				{label}
			</p>
			<Select
				name={name}
				options={options}
				onChange={handleChange}
				value={value}
				{...rest}
				isSearchable
				styles={customStyles}
				placeholder="Any"
				isClearable
			/>
		</div>
	);
}

export default MySelect;
