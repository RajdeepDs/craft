import { auth } from "@craft/auth";
import { db } from "@craft/db";
import type { NextRequest } from "next/server";

export interface Context {
	db: typeof db;
	session: Awaited<ReturnType<typeof auth.api.getSession>>;
}

export async function createContext(req: NextRequest): Promise<Context> {
	const session = await auth.api.getSession({
		headers: req.headers,
	});
	return {
		session,
		db,
	};
}
