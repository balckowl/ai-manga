import type { SelectComic, SelectUser } from "@/db/schema";
import { format } from "date-fns";
import Manga from "./manga";

type Props = {
	comicWithAuthor: { user: SelectUser | null } & { comic: SelectComic };
};

export default function TopManga({ comicWithAuthor }: Props) {
	const { user, comic } = comicWithAuthor;
	const { title, contents, publishedAt } = comic;

	return (
		<article>
			<Manga title={title} contents={contents} />
			<p className="text-3 text-[#808080]">
				{user?.name}先生・{format(publishedAt, "yyyy/MM/dd")}
			</p>
		</article>
	);
}
