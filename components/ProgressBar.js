import { useEffect, useState } from "react";
import reactDom from "react-dom";
import { keyframes } from "styled-components";

const go = keyframes`
  100%{
		background: transparent;
    flex: 10;
    box-shadow: 0 0 0 transparent;
  }
`;

function ProgressBar() {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true), []);

	if (!isBrowser) {
		return <></>;
	}

	return reactDom.createPortal(
		<div
			css={`
				position: fixed;
				width: 100%;
				height: 4px;
				left: 0;
				top: 0;
				margin: auto;
				z-index: 1000000;

				.loader {
					height: 100%;
					display: flex;
					transform: translateZ(0);
				}
				.loader div {
					flex: 1;
					background: #3db4f2;
					animation: ${go} 0.8s infinite alternate ease;
					box-shadow: 0 0 20px #3db4f2;
				}
				.loader div:nth-child(1) {
					-webkit-animation-delay: -0.72s;
					animation-delay: -0.72s;
				}
				.loader div:nth-child(2) {
					-webkit-animation-delay: -0.64s;
					animation-delay: -0.64s;
				}
				.loader div:nth-child(3) {
					-webkit-animation-delay: -0.56s;
					animation-delay: -0.56s;
				}
				.loader div:nth-child(4) {
					-webkit-animation-delay: -0.48s;
					animation-delay: -0.48s;
				}
				.loader div:nth-child(5) {
					-webkit-animation-delay: -0.4s;
					animation-delay: -0.4s;
				}
				.loader div:nth-child(6) {
					-webkit-animation-delay: -0.32s;
					animation-delay: -0.32s;
				}
				.loader div:nth-child(7) {
					-webkit-animation-delay: -0.24s;
					animation-delay: -0.24s;
				}
				.loader div:nth-child(8) {
					-webkit-animation-delay: -0.16s;
					animation-delay: -0.16s;
				}
				.loader div:nth-child(9) {
					-webkit-animation-delay: -0.08s;
					animation-delay: -0.08s;
				}
				.loader div:nth-child(10) {
					-webkit-animation-delay: 0s;
					animation-delay: 0s;
				}
			`}>
			<div className="loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>,
		document.getElementById("progress-bar")
	);
}

export default ProgressBar;
