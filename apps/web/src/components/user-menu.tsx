"use client";

import { Button } from "@craft/ui/components/button";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<Button variant={"tertiary"}>{session ? "Dashboard" : "Login"}</Button>
		);
	}
}
