import styled from "styled-components";

function RoleCards({ children }) {
	return <Cards>{children}</Cards>;
}

export default RoleCards;

const Cards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 185px);
	justify-content: space-between;
	gap: 3rem;
	margin-bottom: 40px;
`;
