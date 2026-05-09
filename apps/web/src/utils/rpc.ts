import { makeClient } from "@craft/rpc/client";

export { AlreadyOnWaitlist, DatabaseError } from "@craft/rpc/requests";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { Effect } from "effect";
import { toast } from "sonner";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			toast.error(`Error: ${error.message}`, {
				action: {
					label: "retry",
					onClick: query.invalidate,
				},
			});
		},
	}),
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 3,
			refetchOnWindowFocus: false,
		},
	},
});

const clientEffect = makeClient("/api/rpc");

export const rpc = {
	joinWaitlist: (input: { email: string }) =>
		Effect.gen(function* () {
			const client = yield* clientEffect;
			return yield* client.JoinWaitlist(input);
		}).pipe(Effect.scoped, Effect.runPromise),
};
