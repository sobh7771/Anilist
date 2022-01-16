import styled from "styled-components";

function RoleCards() {
	return <Cards></Cards>;
}

export default RoleCards;

const Cards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 185px);
	justify-content: space-between;
	margin-bottom: 40px;
`;
