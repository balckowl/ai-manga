import { db } from "@/db";
import { comics, likes, users } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

// 特定の comicId のいいね数を取得する関数
export async function getLikeCountForComic(comicId: number) {
	const likeCount = await db
		.select({
			count: sql`COUNT(*)`.as("count"),
		})
		.from(likes)
		.where(eq(likes.comicId, comicId))
		.execute();

	return likeCount[0]?.count || 0;
}

// 漫画の全取得
export async function getAllComics() {
	try {
		const allComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt));

		// いいね数を取得して追加
		const comicsWithLikes = await Promise.all(
			allComics.map(async (comic) => ({
				...comic,
				likeCount: await getLikeCountForComic(comic.comic.id),
			})),
		);

		return comicsWithLikes;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

// 特定ユーザーの漫画の全取得
export async function getAllMyComics(userId: string) {
	try {
		const allMyComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.where(eq(users.id, userId))
			.orderBy(desc(comics.publishedAt));

		const comicsWithLikes = await Promise.all(
			allMyComics.map(async (comic) => ({
				...comic,
				likeCount: await getLikeCountForComic(comic.comic.id),
			})),
		);

		return comicsWithLikes;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

// 新着漫画6件取得
export async function getNewComics() {
	try {
		const newComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt))
			.limit(6);

		const comicsWithLikes = await Promise.all(
			newComics.map(async (comic) => ({
				...comic,
				likeCount: await getLikeCountForComic(comic.comic.id),
			})),
		);

		return comicsWithLikes;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

// 漫画の個別取得
export async function getComic(comicId: number) {
	try {
		const comic = await db.select().from(comics).where(eq(comics.id, comicId)).execute();

		if (comic.length > 0) {
			const likeCount = await getLikeCountForComic(comic[0].id);
			return { ...comic[0], likeCount };
		}

		return null;
	} catch (error) {
		console.error("Error fetching comic:", error);
		throw new Error("Failed to fetch comic");
	}
}
