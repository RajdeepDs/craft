import { createDb } from "@craft/db";
import * as schema from "@craft/db/schema/auth";
import { env } from "@craft/env/server";
import {
	checkWaitlistAcceptance,
	checkWaitlistAcceptanceByUserId,
} from "@craft/services";
import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Effect, Either } from "effect";

const WAITLIST_REJECTION_MESSAGE =
	"You're on the waitlist. We'll notify you once you're approved.";

const VERIFICATION_FAILURE_MESSAGE =
	"Unable to verify access. Please try again.";

export function createAuth() {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID,
				clientSecret: env.GITHUB_CLIENT_SECRET,
			},
		},
		user: {
			additionalFields: {
				onboardingCompleted: {
					type: "boolean",
					defaultValue: false,
				},
			},
		},
		onAPIError: {
			errorURL: "/login",
		},
		trustedOrigins: [env.CORS_ORIGIN],
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			useSecureCookies: env.NODE_ENV === "production",
		},
		session: {
			expiresIn: 60 * 60 * 24 * 7,
			updateAge: 60 * 60 * 24,
		},
		plugins: [
			// polar({
			// 	client: polarClient,
			// 	createCustomerOnSignUp: true,
			// 	enableCustomerPortal: true,
			// 	use: [
			// 		checkout({
			// 			products: [
			// 				{
			// 					productId: "your-product-id",
			// 					slug: "pro",
			// 				},
			// 			],
			// 			successUrl: env.POLAR_SUCCESS_URL,
			// 			authenticatedUsersOnly: true,
			// 		}),
			// 		portal(),
			// 	],
			// }),
			nextCookies(),
		],
		databaseHooks: {
			user: {
				create: {
					before: async (user) => {
						const result = await Effect.runPromise(
							checkWaitlistAcceptance(user.email).pipe(Effect.either)
						);

						if (Either.isLeft(result)) {
							throw new APIError("UNAUTHORIZED", {
								message: WAITLIST_REJECTION_MESSAGE,
							});
						}

						return { data: user };
					},
				},
			},
			session: {
				create: {
					before: async (session) => {
						const result = await Effect.runPromise(
							checkWaitlistAcceptanceByUserId(session.userId).pipe(
								Effect.either
							)
						);

						if (Either.isLeft(result)) {
							const error = result.left;
							const message =
								error._tag === "NotApproved"
									? WAITLIST_REJECTION_MESSAGE
									: VERIFICATION_FAILURE_MESSAGE;

							throw new APIError("UNAUTHORIZED", { message });
						}

						return { data: session };
					},
				},
			},
		},
	});
}

export const auth = createAuth();
