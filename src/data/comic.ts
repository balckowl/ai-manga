import { db } from "@/db";
import { comics, likes, users } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

// 特定の comicId のいいね数とユーザーのいいねステータスを取得する関数
export async function getLikeCountForComic(comicId: number, userId: string) {
	const [likeCount, userLikeStatus] = await Promise.all([
		db
			.select({
				count: sql`COUNT(*)`.as("count"),
			})
			.from(likes)
			.where(eq(likes.comicId, comicId))
			.execute(),

		db
			.select()
			.from(likes)
			.where(and(eq(likes.comicId, comicId), eq(likes.userId, userId)))
			.execute(),
	]);

	return {
		count: likeCount[0]?.count || 0,
		isLikedByUser: userLikeStatus.length > 0,
	};
}

// 漫画の全取得
export async function getAllComics(userId: string) {
	try {
		const allComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt));

		// いいね数とユーザーのいいねステータスを取得して追加
		const comicsWithLikes = await Promise.all(
			allComics.map(async (comic) => {
				const { count, isLikedByUser } = await getLikeCountForComic(comic.comic.id, userId);
				return {
					...comic,
					likeCount: count,
					isLikedByUser,
				};
			}),
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
			allMyComics.map(async (comic) => {
				const { count, isLikedByUser } = await getLikeCountForComic(comic.comic.id, userId);
				return {
					...comic,
					likeCount: count,
					isLikedByUser,
				};
			}),
		);

		return comicsWithLikes;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

// 新着漫画6件取得
export async function getNewComics(userId: string) {
	try {
		const newComics = await db
			.select()
			.from(comics)
			.leftJoin(users, eq(users.id, comics.userId))
			.orderBy(desc(comics.publishedAt))
			.limit(6);

		const comicsWithLikes = await Promise.all(
			newComics.map(async (comic) => {
				const { count, isLikedByUser } = await getLikeCountForComic(comic.comic.id, userId);
				return {
					...comic,
					likeCount: count,
					isLikedByUser,
				};
			}),
		);

		return comicsWithLikes;
	} catch (error) {
		console.error("Error fetching comics:", error);
		throw new Error("Failed to fetch comics");
	}
}

// いいね数が多い上位6件の漫画を取得する関数
export async function getTopLikedComics(userId: string) {
	try {
		// 上位6件のいいね数が多い漫画を取得
		const topLikedComics = await db
			.select({
				comic: comics,
				likeCount: sql`COUNT(likes.id)`.as("likeCount"),
				isLikedByUser:
					sql`EXISTS(SELECT 1 FROM likes AS user_like WHERE user_like.userId = ${userId} AND user_like.comicId = comics.id)`.as(
						"isLikedByUser",
					),
			})
			.from(comics)
			.leftJoin(likes, eq(likes.comicId, comics.id))
			.groupBy(comics.id)
			.orderBy(desc(sql`COUNT(likes.id)`))
			.limit(6)
			.execute();

		return topLikedComics;
	} catch (error) {
		console.error("Error fetching top liked comics:", error);
		throw new Error("Failed to fetch top liked comics");
	}
}

// 特定のユーザーがいいねした全ての漫画を取得する関数
export async function getLikedComicsForUser(userId: string) {
	try {
		// いいねした漫画を取得
		const likedComics = await db
			.select({
				comic: comics,
				likeCount: sql`COUNT(likes.id)`.as("likeCount"),
				isLikedByUser: sql`TRUE`.as("isLikedByUser"),
			})
			.from(likes)
			.innerJoin(comics, eq(likes.comicId, comics.id))
			.where(eq(likes.userId, userId))
			.groupBy(comics.id)
			.execute();

		return likedComics;
	} catch (error) {
		console.error("Error fetching liked comics for user:", error);
		throw new Error("Failed to fetch liked comics");
	}
}

// 漫画の個別取得
export async function getComic(comicId: number, userId: string) {
	try {
		const comic = await db.select().from(comics).where(eq(comics.id, comicId)).execute();

		if (comic.length > 0) {
			const { count, isLikedByUser } = await getLikeCountForComic(comic[0].id, userId);
			return { ...comic[0], likeCount: count, isLikedByUser };
		}

		return null;
	} catch (error) {
		console.error("Error fetching comic:", error);
		throw new Error("Failed to fetch comic");
	}
}
