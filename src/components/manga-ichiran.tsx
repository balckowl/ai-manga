import type { SelectComic } from "@/db/schema";
import Image from "next/image";
import TopManga from "./top-manga";

type Props = {
	title: string;
	comics: SelectComic[];
};

export default function MangaIchiran({ title, comics }: Props) {
	return (
		<div className="container mx-auto pt-[100px]">
			<div className="relative mb-[45px] flex justify-center">
				<Image src="/title-kirinuki.png" width={500} height={100} alt="" />
				<h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] font-bold text-[30px]">
					{title}
				</h3>
			</div>
			<div className="grid grid-cols-3 gap-9">
				{comics.map((comic, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TopManga comic={comic} key={i} />
				))}
			</div>
		</div>
	);
}
