import { Data, Schema } from "effect";

export class AlreadyOnWaitlist extends Schema.TaggedError<AlreadyOnWaitlist>()(
	"AlreadyOnWaitlist",
	{ email: Schema.String }
) {}

export class DatabaseError extends Schema.TaggedError<DatabaseError>()(
	"DatabaseError",
	{ cause: Schema.Unknown }
) {}

export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
	"UnauthorizedError",
	{}
) {}

export class SessionError extends Schema.TaggedError<SessionError>()(
	"SessionError",
	{ cause: Schema.Unknown }
) {}

export class NotApproved extends Data.TaggedError("NotApproved")<{
	email: string;
}> {}

export class UserNotFound extends Data.TaggedError("UserNotFound")<{
	userId: string;
}> {}
