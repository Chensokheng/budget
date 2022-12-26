import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Redirect from "../components/Redirect";

export default function useCustomUser() {
	const user = useUser();
	if (!user) {
		return <Redirect to="/auth" />;
	}
	return user;
}
