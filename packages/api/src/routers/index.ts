import { waitlist } from "@craft/db/schema/waitlist";
import type { RouterClient } from "@orpc/server";
import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure } from "../index";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	joinWaitlist: publicProcedure
		.input(
			z.object({
				email: z.email(),
			})
		)
		.handler(async ({ context, input }) => {
			const { email } = input;

			const existingEntry = await context.db
				.select()
				.from(waitlist)
				.where(eq(waitlist.email, email))
				.limit(1);

			if (existingEntry.length > 0) {
				throw new ORPCError("EMAIL_ALREADY_REGISTERED");
			}

			await context.db.insert(waitlist).values({
				id: nanoid(),
				email,
			});

			return {
				message: "You've been added to the waitlist!",
			};
		}),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
