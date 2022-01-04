import Member from "./Member";

function StaffPreview({ staff }) {
	return (
		<div
			css={`
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
				grid-column-gap: 3rem;
				grid-row-gap: 1.5rem;
				height: max-content;
			`}>
			{staff.map((m) => (
				<Member key={m.id} member={m} />
			))}
		</div>
	);
}

export default StaffPreview;
