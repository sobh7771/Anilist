import { keyframes } from "styled-components";

const lds_ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

function Spinner() {
	return (
		<div
			css={`
				display: inline-block;
				position: relative;
				width: 80px;
				height: 80px;
				& div {
					box-sizing: border-box;
					display: block;
					position: absolute;
					width: 4rem;
					height: 4rem;
					margin: 8px;
					border: 6px solid #fafafa;
					border-radius: 50%;
					animation: ${lds_ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
					border-color: #fff transparent transparent transparent;
				}
				& div:nth-child(1) {
					animation-delay: -0.45s;
				}
				& div:nth-child(2) {
					animation-delay: -0.3s;
				}
				& div:nth-child(3) {
					animation-delay: -0.15s;
				}
			`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Spinner;
