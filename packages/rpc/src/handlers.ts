import { joinWaitlist } from "@craft/services";
import { Effect } from "effect";
import {
	AlreadyOnWaitlist,
	DatabaseError,
	JoinWaitlistSuccess,
	WaitlistRpcs,
} from "./requests.js";

export const HandlersLive = WaitlistRpcs.toLayer(
	Effect.succeed({
		HealthCheck: () => Effect.succeed("OK"),
		JoinWaitlist: ({ email }: { email: string }) =>
			joinWaitlist(email).pipe(
				Effect.as(
					new JoinWaitlistSuccess({
						message: "You've been added to the waitlist!",
					})
				),
				Effect.mapError((e) => {
					if (e._tag === "AlreadyOnWaitlist") {
						return new AlreadyOnWaitlist({ email: e.email });
					}
					return new DatabaseError({ cause: e.cause });
				})
			),
	})
);
