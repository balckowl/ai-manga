import { db } from "@/db";
import { likes } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// 特定の comicId のいいね数を取得する関数
export async function getLikeCountForComic(comicId: number) {
	const likeCount = await db
		.select({
			count: sql`COUNT(*)`.as("count"), // SQLでCOUNT(*)を使用
		})
		.from(likes)
		.where(eq(likes.comicId, comicId)) // comicId でフィルタ
		.execute();

	// `likeCount` は1件のデータを含む配列として返るので、count を取得
	return likeCount[0]?.count || 0; // レコードがない場合は 0 を返す
}
