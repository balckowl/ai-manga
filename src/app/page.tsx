import Hero from "@/components/hero";
import MangaIchiran from "@/components/manga-ichiran";
import Recommend from "@/components/recommend";
import { Fragment } from "react";

export default function Page() {
	return (
		<Fragment>
			<Hero />
			<MangaIchiran title="いいね数上位" />
			<MangaIchiran title="新着作品" />
			<Recommend />
		</Fragment>
	);
}
