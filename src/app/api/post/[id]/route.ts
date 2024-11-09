import { db } from "@/db";
import { comics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
	const comicId = Number.parseInt(params.id, 10);

	await db.delete(comics).where(eq(comics.id, comicId));

	return NextResponse.json({ success: true });
}
