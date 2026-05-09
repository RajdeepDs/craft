import { db } from "@craft/db";
import * as schema from "@craft/db/schema/auth";
import { waitlist } from "@craft/db/schema/waitlist";
import { and, eq } from "drizzle-orm";
import { Effect } from "effect";
import { DatabaseError, NotApproved, UserNotFound } from "../errors";

export const checkWaitlistAcceptance = (email: string) =>
	Effect.gen(function* () {
		const rows = yield* Effect.tryPromise({
			try: async () =>
				db
					.select({ id: waitlist.id })
					.from(waitlist)
					.where(and(eq(waitlist.email, email), eq(waitlist.accepted, true)))
					.limit(1),
			catch: (e) => new DatabaseError({ cause: e }),
		});

		if (rows.length === 0) {
			return yield* Effect.fail(new NotApproved({ email }));
		}
	});

export const checkWaitlistAcceptanceByUserId = (userId: string) =>
	Effect.gen(function* () {
		const users = yield* Effect.tryPromise({
			try: async () =>
				db
					.select({ email: schema.user.email })
					.from(schema.user)
					.where(eq(schema.user.id, userId))
					.limit(1),
			catch: (e) => new DatabaseError({ cause: e }),
		});

		const currentUser = users[0];
		if (!currentUser?.email) {
			return yield* Effect.fail(new UserNotFound({ userId }));
		}

		yield* checkWaitlistAcceptance(currentUser.email);
	});
