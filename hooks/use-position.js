import { useEffect, useRef, useState } from "react";

const usePosition = () => {
	const [position, setPosition] = useState("");
	const ref = useRef(null);

	useEffect(() => {
		const { x } = ref.current.getBoundingClientRect();

		if (x >= 290) {
			setPosition("left");
		} else {
			setPosition("right");
		}
	}, []);

	return { position, ref };
};

export default usePosition;
