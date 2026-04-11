import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable(
	"waitlist",
	{
		id: text("id").primaryKey(),
		email: text("email").notNull().unique(),
		accepted: boolean("accepted").default(false).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("waitlist_email_idx").on(table.email)]
);

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
