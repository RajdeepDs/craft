import { db } from "@craft/db";
import { waitlist } from "@craft/db/schema/waitlist";
import { Effect } from "effect";
import { AlreadyOnWaitlist, DatabaseError } from "../errors";

const isUniqueViolation = (e: unknown): boolean => {
	if (typeof e !== "object" || e === null) {
		return false;
	}
	if ("code" in e && (e as { code: unknown }).code === "23505") {
		return true;
	}
	if ("cause" in e) {
		return isUniqueViolation((e as { cause: unknown }).cause);
	}
	return false;
};

export const joinWaitlist = (email: string) =>
	Effect.gen(function* () {
		const result = yield* Effect.tryPromise({
			try: async () => {
				await db.insert(waitlist).values({ id: crypto.randomUUID(), email });
			},
			catch: (e) =>
				isUniqueViolation(e)
					? new AlreadyOnWaitlist({ email })
					: new DatabaseError({ cause: e }),
		});

		return result;
	});
