import { Data } from "effect";

export class AlreadyOnWaitlist extends Data.TaggedError("AlreadyOnWaitlist")<{
	email: string;
}> {}

export class NotApproved extends Data.TaggedError("NotApproved")<{
	email: string;
}> {}

export class UserNotFound extends Data.TaggedError("UserNotFound")<{
	userId: string;
}> {}

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
	cause: unknown;
}> {}
