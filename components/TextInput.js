import { useRouter } from "next/router";

function TextInput({ value }) {
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
		<div
			css={`
				grid-column: 1/6;
				@media only screen and (max-width: 1040px) {
					grid-column: 1/24;
				}
			`}>
			<p
				css={`
					margin-bottom: 1rem;
					font-size: 1.5rem;
					font-weight: 600;
					font-family: Overpass;
					color: #516170;
				`}>
				Search
			</p>

			<input
				type="text"
				onChange={(e) =>
					handleChange(
						{ value: e.target.value, label: e.target.value },
						{ name: "search" }
					)
				}
				value={value}
				css={`
					border: 0;
					background: rgb(251, 251, 251);
					box-shadow: 0 14px 30px rgba(103, 132, 187, 0.1),
						0 4px 4px rgba(103, 132, 187, 0.04);
					font-family: Overpass;
					fontsize: 1.3rem;
					color: #5c728a;
					font-weight: 600;
					height: 38px;
					padding: 8px;
					border-radius: 4px;
					width: 100%;
				`}
			/>
		</div>
	);
}

export default TextInput;
