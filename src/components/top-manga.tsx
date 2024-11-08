import type { SelectComic } from "@/db/schema";
import { format } from "date-fns";
import Manga from "./manga";

type Props = {
	comic: SelectComic;
};

export default function TopManga({ comic }: Props) {
	const { title, contents, publishedAt } = comic;

	return (
		<article>
			<Manga title={title} contents={contents} />
			<p className="text-3 text-[#808080]">宮沢賢治先生yo・{format(publishedAt, "yyyy/MM/dd")}</p>
		</article>
	);
}
