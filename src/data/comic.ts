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

//特定ユーザーの漫画の全取得
export async function getAllMyComics(userId: string) {
	try {
		const allMyComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.where(eq(users.id, userId))
			.orderBy(desc(comics.publishedAt));
		return allMyComics;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

//新着漫画6件取得
export async function getNewComics() {
	try {
		const newComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt))
			.limit(6);
		return newComics;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

//漫画の個別取得
export async function getComic(comicId: number) {
	try {
		const comic = await db.select().from(comics).where(eq(comics.id, comicId));
		return comic;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}
