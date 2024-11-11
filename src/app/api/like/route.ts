import { db } from "@/db";
import { likes } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { userId, comicId }: { userId: string; comicId: number } = await request.json();

		// 既にいいねがあるか確認
		const existingLike = await db
			.select()
			.from(likes)
			.where(and(eq(likes.userId, userId), eq(likes.comicId, comicId)))
			.execute();

		if (existingLike.length > 0) {
			// いいねが既にある場合は削除
			await db
				.delete(likes)
				.where(and(eq(likes.userId, userId), eq(likes.comicId, comicId)))
				.execute();

			return NextResponse.json({ action: "removed", success: true });
		}
		// いいねがない場合は追加
		await db
			.insert(likes)
			.values({
				userId,
				comicId,
			})
			.execute();

		return NextResponse.json({ action: "added", success: true });
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
