import Hero from "@/components/hero";
import MangaIchiran from "@/components/manga-ichiran";
import Recommend from "@/components/recommend";
import { getNewComics } from "@/data/comic";
import { Fragment } from "react";

export default async function Page() {
	const newComicsWithAuthor = await getNewComics();

	return (
		<Fragment>
			<Hero />
			<MangaIchiran title="いいね数上位" comicsWithAuthor={newComicsWithAuthor} />
			<MangaIchiran title="新着一覧" comicsWithAuthor={newComicsWithAuthor} />
			<Recommend />
		</Fragment>
	);
}
