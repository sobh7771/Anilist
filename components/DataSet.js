import styled from "styled-components";

function DataSet({ type, children, value }) {
	if (children) {
		return (
			<StyledDataSet>
				<p className="type">{type}</p>
				{children}
			</StyledDataSet>
		);
	}

	return value ? (
		<StyledDataSet>
			<p className="type">{type}</p>
			<div className="value">{value}</div>
		</StyledDataSet>
	) : (
		""
	);
}

export default DataSet;

/**
 * Styled Components
 */

export const StyledDataSet = styled.div`
	padding-bottom: 1.4rem;
	.type {
		font-size: 1.3rem;
		font-weight: 500;
		padding-bottom: 5px;
	}

	.value {
		font-size: 1.2rem;
		color: rgb(146, 153, 161);
		line-height: 1.3;
		display: block;
	}
`;
