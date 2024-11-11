import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type Session, type User } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	trustHost: true,
	basePath: "/api/auth",
	callbacks: {
		async session({ session, user }: { session: Session; user: User }) {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	adapter: DrizzleAdapter(db),
});
