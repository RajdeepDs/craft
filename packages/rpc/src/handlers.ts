import { joinWaitlist } from "@craft/services";
import { Effect } from "effect";
import { JoinWaitlistSuccess, WaitlistRpcs } from "./requests";

export const HandlersLive = WaitlistRpcs.toLayer(
	Effect.succeed({
		JoinWaitlist: ({ email }: { email: string }) =>
			joinWaitlist(email).pipe(
				Effect.as(
					new JoinWaitlistSuccess({
						message: "You've been added to the waitlist!",
					})
				)
			),
	})
);
