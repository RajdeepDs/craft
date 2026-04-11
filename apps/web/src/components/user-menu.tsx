"use client";

import { ButtonLink } from "@craft/ui/components/button";
import type { Route } from "next";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<ButtonLink href={"/login" as Route} variant={"tertiary"}>
				{session ? "Dashboard" : "Login"}
			</ButtonLink>
		);
	}
}
