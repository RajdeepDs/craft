import { NodeHttpServer } from "@effect/platform-node";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { HandlersLive } from "./handlers.js";
import { WaitlistRpcs } from "./requests.js";

const ServerLayer = Layer.mergeAll(
	HandlersLive,
	RpcSerialization.layerNdjson,
	NodeHttpServer.layerContext
);

export const { handler: rpcHandler, dispose: disposeRpc } =
	RpcServer.toWebHandler(WaitlistRpcs, {
		layer: ServerLayer,
	});
