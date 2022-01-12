import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

function TextInput({ value }) {
	const router = useRouter();

	const handleChange = (e) => {
		router.push(
			{
				query: JSON.parse(
					JSON.stringify({
						...router.query,
						search: e.target.value || undefined,
					})
				),
			},
			null,
			{ shallow: true }
		);
	};

	return (
		<div
			css={`
				position: relative;
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

			<FaSearch
				css={`
					position: absolute;
					top: 50%;
					left: 8px;
					transform: translateY(40%);
					color: rgb(201, 215, 227);
					font-size: 1.3rem;
					height: 1.6rem;
				`}
			/>

			<input
				type="text"
				onChange={handleChange}
				value={router.query.search || ""}
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
					padding-left: 2.9rem;
				`}
			/>
		</div>
	);
}

export default TextInput;
