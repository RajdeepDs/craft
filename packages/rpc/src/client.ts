import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Layer } from "effect";

export { RpcClient } from "@effect/rpc";
export { WaitlistRpcs } from "./requests.js";

export const makeClientLayer = (url: string) =>
	RpcClient.layerProtocolHttp({ url }).pipe(
		Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson])
	);
