import styled from "styled-components";

function StaffMemberPersonalInfoDataPoint({ label, value }) {
	return (
		!!value && (
			<PersonalInfoDataPoint>
				<span className="label">{label}:</span>
				{value}
			</PersonalInfoDataPoint>
		)
	);
}

export default StaffMemberPersonalInfoDataPoint;

const PersonalInfoDataPoint = styled.div`
	color: #5c728a;
	font-size: 1.4rem;
	font-family: Roboto;
	line-height: 2.1rem;

	.label {
		font-weight: 700;
		margin-right: 4px;
	}
`;
