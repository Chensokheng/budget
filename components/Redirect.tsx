import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
	const router = useRouter();
	useEffect(() => {
		router.push(to);
	}, [to, router]);

	return <></>;
}
