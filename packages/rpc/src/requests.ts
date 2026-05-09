import { AlreadyOnWaitlist, DatabaseError } from "@craft/services/errors";
import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

export { AlreadyOnWaitlist, DatabaseError } from "@craft/services/errors";

export class JoinWaitlistSuccess extends Schema.TaggedClass<JoinWaitlistSuccess>()(
	"JoinWaitlistSuccess",
	{ message: Schema.String }
) {}

export class WaitlistRpcs extends RpcGroup.make(
	Rpc.make("JoinWaitlist", {
		success: JoinWaitlistSuccess,
		error: Schema.Union(AlreadyOnWaitlist, DatabaseError),
		payload: { email: Schema.String },
	})
) {}
