import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer } from "effect";
import { WaitlistRpcs } from "./requests";

export { WaitlistRpcs } from "./requests";

export const makeClientLayer = (url: string) =>
	RpcClient.layerProtocolHttp({ url }).pipe(
		Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson])
	);

export const makeClient = (url: string) =>
	RpcClient.make(WaitlistRpcs).pipe(Effect.provide(makeClientLayer(url)));
