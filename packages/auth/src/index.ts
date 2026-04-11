import { createDb } from "@craft/db";
import * as schema from "@craft/db/schema/auth";
import { waitlist } from "@craft/db/schema/waitlist";
import { env } from "@craft/env/server";
import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { and, eq } from "drizzle-orm";

const WAITLIST_REJECTION_MESSAGE =
	"You're on the waitlist. We'll notify you once you're approved.";

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
						const acceptedRow = await db
							.select({ id: waitlist.id })
							.from(waitlist)
							.where(
								and(eq(waitlist.email, user.email), eq(waitlist.accepted, true))
							)
							.limit(1);

						if (acceptedRow.length === 0) {
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
						const [currentUser] = await db
							.select({ email: schema.user.email })
							.from(schema.user)
							.where(eq(schema.user.id, session.userId))
							.limit(1);

						if (!currentUser?.email) {
							throw new APIError("UNAUTHORIZED", {
								message: "Unable to verify access. Please try again.",
							});
						}

						const acceptedRow = await db
							.select({ id: waitlist.id })
							.from(waitlist)
							.where(
								and(
									eq(waitlist.email, currentUser.email),
									eq(waitlist.accepted, true)
								)
							)
							.limit(1);

						if (acceptedRow.length === 0) {
							throw new APIError("UNAUTHORIZED", {
								message: WAITLIST_REJECTION_MESSAGE,
							});
						}

						return { data: session };
					},
				},
			},
		},
	});
}

export const auth = createAuth();
