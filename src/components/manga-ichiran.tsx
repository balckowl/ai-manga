import type { SelectComic, SelectUser } from "@/db/schema";
import Image from "next/image";
import TopManga from "./top-manga";

type Props = {
	title: string;
	comicsWithAuthor: ComicType[];
};

type ComicType = { comic: SelectComic } & { user: SelectUser | null };

export default function MangaIchiran({ title, comicsWithAuthor }: Props) {
	return (
		<div className="container mx-auto pt-[100px]">
			<div className="relative mb-[45px] flex justify-center">
				<Image src="/title-kirinuki.png" width={500} height={100} alt="" />
				<h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] font-bold text-[30px]">
					{title}
				</h3>
			</div>
			<div className="grid grid-cols-3 gap-9">
				{comicsWithAuthor.map((comicWithAuthor, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TopManga comicWithAuthor={comicWithAuthor} key={i} />
				))}
			</div>
		</div>
	);
}
