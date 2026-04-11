import { env } from "@craft/env/server";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";

const { Pool } = pg;

export function createDb() {
	if (env.NODE_ENV === "production") {
		const sql = neon(env.DATABASE_URL);
		return drizzleNeon(sql, { schema });
	}

	const pool = new Pool({ connectionString: env.DATABASE_URL });
	return drizzlePg(pool, { schema });
}

export const db = createDb();
