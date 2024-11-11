import type { SelectComic, SelectUser } from "@/db/schema";
import MangaDialog from "./manga-dialog";
import SubTitle from "./sub-title";
import TopManga from "./top-manga";

type Props = {
	title: string;
	comicsWithAuthor: ComicType[];
};

type ComicType = { comic: SelectComic } & { user: SelectUser | null };

export default function MangaIchiran({ title, comicsWithAuthor }: Props) {
	return (
		<div className="container mx-auto pt-[100px]">
			<SubTitle title={title} />
			<div className="grid grid-cols-3 gap-9">
				{comicsWithAuthor.map((comicWithAuthor, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<MangaDialog comicWithAuthor={comicWithAuthor} key={i}>
						<TopManga comicWithAuthor={comicWithAuthor} />
					</MangaDialog>
				))}
			</div>
		</div>
	);
}
