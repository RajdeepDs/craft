import { auth } from "@craft/auth";
import { SessionError, UnauthorizedError } from "@craft/services/errors";
import { HttpServerRequest } from "@effect/platform";
import { NodeHttpServer } from "@effect/platform-node";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Context, Effect, Layer } from "effect";
import { HandlersLive } from "./handlers";
import { WaitlistRpcs } from "./requests";

export class RequestContext extends Context.Tag("RequestContext")<
	RequestContext,
	{ readonly userId: string }
>() {}

// Per-request layer: requires HttpServerRequest which is live during handler execution.
export const RequestContextLive = Layer.effect(
	RequestContext,
	Effect.gen(function* () {
		const req = yield* HttpServerRequest.HttpServerRequest;
		const session = yield* Effect.tryPromise({
			try: () => auth.api.getSession({ headers: req.headers }),
			catch: (cause) => new SessionError({ cause }),
		});
		if (!session?.user?.id) {
			return yield* Effect.fail(new UnauthorizedError());
		}
		return { userId: session.user.id };
	})
);

// Static server infrastructure — RequestContext is injected per-request via middleware.
const ServerLayer = Layer.mergeAll(
	HandlersLive,
	RpcSerialization.layerNdjson,
	NodeHttpServer.layerContext
);

export const { handler: rpcHandler, dispose: disposeRpc } =
	RpcServer.toWebHandler(WaitlistRpcs, {
		layer: ServerLayer,
		// Inject RequestContext into every request using the live HttpServerRequest.
		middleware: (app) =>
			app.pipe(Effect.provide(RequestContextLive)) as typeof app,
	});
