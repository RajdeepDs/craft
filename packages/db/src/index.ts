import { env } from "@craft/env/server";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

export function createDb() {
	if (env.NODE_ENV === "production") {
		const sql = neon(env.DATABASE_URL);
		return drizzleNeon(sql, { schema });
	}

	return drizzle(env.DATABASE_URL, { schema });
}

export const db = createDb();
