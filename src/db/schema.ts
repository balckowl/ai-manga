import {
	boolean,
	integer,
	json,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	}),
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
);

export const comics = pgTable("comic", {
	id: serial("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	contents: json().$type<{ text: string; img: string }[]>().notNull(),
	publishedAt: timestamp("publishedAt", { mode: "date" }).defaultNow().notNull(),
});

export const likes = pgTable("like", {
	id: serial("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	comicId: integer("comicId")
		.notNull()
		.references(() => comics.id, { onDelete: "cascade" }),
});

export type SelectUser = typeof users.$inferSelect;

export type InsertComic = typeof comics.$inferInsert;
export type SelectComic = typeof comics.$inferSelect;

export type InsertLike = typeof likes.$inferInsert;
export type SelectLike = typeof likes.$inferSelect;
