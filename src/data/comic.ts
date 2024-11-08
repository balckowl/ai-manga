import { db } from "@/db";
import { comics, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

//漫画の全取得
export async function getAllComics() {
	try {
		const allComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt));
		return allComics;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

//新着漫画6件取得
export async function getNewComics() {
	try {
		const allComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt))
			.limit(6);
		return allComics;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}
