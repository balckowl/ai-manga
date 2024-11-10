import { db } from "@/db";
import { likes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// いいねの切り替え
export async function toggleLike(userId: string, comicId: number) {
	try {
		// 既にいいねをしているか確認
		const existingLike = await db
			.select()
			.from(likes)
			.where(and(eq(likes.userId, userId), eq(likes.comicId, comicId)))
			.execute();

		if (existingLike.length > 0) {
			// 既にいいねしている場合は削除
			const result = await db
				.delete(likes)
				.where(and(eq(likes.userId, userId), eq(likes.comicId, comicId)))
				.execute();

			return { action: "removed", result };
		}

		// いいねがない場合は追加
		const result = await db
			.insert(likes)
			.values({
				userId,
				comicId,
			})
			.execute();

		return { action: "added", result };
	} catch (error) {
		console.error("Error toggling like:", error);
		throw new Error("Failed to toggle like");
	}
}
