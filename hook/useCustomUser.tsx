import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Redirect from "../components/Redirect";

export default function useCustomUser() {
	const user = useUser();
	console.log(user);
	if (!user) {
		console.log("hello");
		return <Redirect to="/auth" />;
	}
	return user;
}
