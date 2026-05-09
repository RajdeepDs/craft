import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

export class AlreadyOnWaitlist extends Schema.TaggedError<AlreadyOnWaitlist>()(
	"AlreadyOnWaitlist",
	{ email: Schema.String }
) {}

export class DatabaseError extends Schema.TaggedError<DatabaseError>()(
	"DatabaseError",
	{ cause: Schema.Unknown }
) {}

export class JoinWaitlistSuccess extends Schema.Class<JoinWaitlistSuccess>(
	"JoinWaitlistSuccess"
)({ message: Schema.String }) {}

export class WaitlistRpcs extends RpcGroup.make(
	Rpc.make("HealthCheck", {
		success: Schema.String,
	}),
	Rpc.make("JoinWaitlist", {
		success: JoinWaitlistSuccess,
		error: Schema.Union(AlreadyOnWaitlist, DatabaseError),
		payload: { email: Schema.String },
	})
) {}
