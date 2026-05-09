import { makeClientLayer, RpcClient, WaitlistRpcs } from "@craft/rpc/client";

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

const clientLayer = makeClientLayer("/api/rpc");

const run = <A, E>(effect: Effect.Effect<A, E, never>) =>
	Effect.runPromise(effect);

export const rpc = {
	healthCheck: () =>
		run(
			Effect.gen(function* () {
				const client = yield* RpcClient.make(WaitlistRpcs);
				return yield* client.HealthCheck({});
			}).pipe(Effect.scoped, Effect.provide(clientLayer))
		),

	joinWaitlist: (input: { email: string }) =>
		run(
			Effect.gen(function* () {
				const client = yield* RpcClient.make(WaitlistRpcs);
				return yield* client.JoinWaitlist(input);
			}).pipe(Effect.scoped, Effect.provide(clientLayer))
		),
};
