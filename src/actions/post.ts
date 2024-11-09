"use server";

import { db } from "@/db";
import { comics } from "@/db/schema";

type ComicInput = {
	userId: string;
	title: string;
	contents: { text: string; img: string }[];
};

export async function postComic({ userId, title, contents }: ComicInput) {
	await db.insert(comics).values({ userId, title, contents });
	return { success: true };
}
