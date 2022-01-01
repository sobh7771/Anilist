import { useRouter } from "next/router";

function MyRouter({ path, children }) {
	const router = useRouter();

	// / route
	if (path.split("#").join("") === router.asPath.split("#").join("")) {
		return children;
	}

	if (path === router.asPath) {
		return children;
	}

	return <></>;
}

export default MyRouter;
