import { db } from "@/db";
import { comics } from "@/db/schema";
import type { InsertComic } from "@/db/schema";
import { NextResponse } from "next/server";

type ComicInput = {
	userId: string;
	title: string;
	contents: InsertComic["contents"];
};

export async function POST(request: Request) {
	try {
		const { userId, title, contents }: ComicInput = await request.json();

		await db.insert(comics).values({ userId, title, contents });

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 },
		);
	}
}
