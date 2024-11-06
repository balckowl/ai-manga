import Hero from "@/components/hero";
import MangaIchiran from "@/components/manga-ichiran";
import { Fragment } from "react";

export default function Page() {
	return (
		<Fragment>
			<Hero />
			<MangaIchiran title="いいね数上位" />
			<MangaIchiran title="新着一覧" />
		</Fragment>
	);
}
