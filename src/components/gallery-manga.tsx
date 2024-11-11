"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { SelectComic, SelectUser } from "@/db/schema";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Manga from "./manga";
import MangaDialog from "./manga-dialog";

type Props = {
	myComic: ComicType;
};

type ComicType = { comic: SelectComic } & { user: SelectUser | null };

export default function GalleryManga({ myComic }: Props) {
	const { comic } = myComic;
	const { title, contents, publishedAt, id } = comic;
	const formatedPublishedAt = format(publishedAt, "yyyy/MM/dd");
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDelete = async () => {
		await fetch(`/api/post/${id}`, {
			method: "DELETE",
		});
		router.refresh();
	};

	return (
		<article>
			<MangaDialog comicWithAuthor={myComic}>
				<Manga title={title} contents={contents} />
			</MangaDialog>
			<div className="flex justify-between text-3 text-[#808080]">
				<time dateTime={formatedPublishedAt}>{formatedPublishedAt}</time>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger>
						<FaRegTrashAlt className="transition-colors duration-200 hover:text-red-400" />
					</DialogTrigger>

					<DialogContent className="w-[600px]">
						<DialogTitle className="mx-auto text-center">作品の削除</DialogTitle>
						<FaRegTrashAlt className="mx-auto mt-[30px] mb-[20px] text-9xl text-black" />
						<div className="mb-[20px] text-center">
							<h2 className="mb-[10px] text-center font-bold text-2xl">作品を削除するよ</h2>
							<p>元に戻せないから注意してね！</p>
						</div>
						<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
							<Button type="button" variant="default" onClick={handleDelete} className="font-bold">
								削除する
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
								className="border-2 border-black border-solid font-bold"
							>
								キャンセル
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</article>
	);
}
