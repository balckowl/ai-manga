import { auth } from "@/auth";
import Hero from "@/components/hero";
import MangaIchiran from "@/components/manga-ichiran";
import Recommend from "@/components/recommend";
import { getNewComics } from "@/data/comic";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function Page() {
	const session = await auth();
	if (session) redirect("/mypage");
	const newComicsWithAuthor = await getNewComics();

	return (
		<Fragment>
			<Hero />
			<div className="mx-auto w-[90%]">
				<MangaIchiran title="いいね数上位" comicsWithAuthor={newComicsWithAuthor} />
				<MangaIchiran title="新着作品" comicsWithAuthor={newComicsWithAuthor} />
			</div>
			<Recommend />
		</Fragment>
	);
}
