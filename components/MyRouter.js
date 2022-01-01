import { useRouter } from "next/router";

function MyRouter({ path, children }) {
	const router = useRouter();
	return path === router.asPath ? children : <></>;
}

export default MyRouter;
