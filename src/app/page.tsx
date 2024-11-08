import Hero from "@/components/hero";
import MangaIchiran from "@/components/manga-ichiran";
import Recommend from "@/components/recommend";
import { getNewComics } from "@/data/comic";
import { Fragment } from "react";

export default async function Page() {
	const newComics = await getNewComics();

	return (
		<Fragment>
			<Hero />
			<MangaIchiran title="いいね数上位" comics={newComics} />
			<MangaIchiran title="新着一覧" comics={newComics} />
			<Recommend />
		</Fragment>
	);
}
