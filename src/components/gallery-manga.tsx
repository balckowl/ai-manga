"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { SelectComic, SelectUser } from "@/db/schema";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import Manga from "./manga";

type Props = {
	myComic: ComicType;
};

type ComicType = { comic: SelectComic } & { user: SelectUser | null };

export default function GalleryManga({ myComic }: Props) {
	const { comic } = myComic;
	const { title, contents, publishedAt, id } = comic;
	const formatedPublishedAt = format(publishedAt, "yyyy/MM/dd");
	const router = useRouter();

	const handleDelete = async () => {
		await fetch(`/api/post/${id}`, {
			method: "DELETE",
		});
		router.refresh();
	};

	return (
		<article>
			<Manga title={title} contents={contents} />
			<div className="flex justify-between">
				<time dateTime={formatedPublishedAt}>{formatedPublishedAt}</time>
				<Dialog>
					<DialogTrigger>
						<FaRegTrashAlt className="transition-colors duration-200 hover:text-red-400" />
					</DialogTrigger>

					<DialogContent className="max-w-[400px]">
						<DialogHeader>
							<DialogTitle className="mx-auto mb-10 text-center">作品の削除</DialogTitle>
							<DialogDescription className="text-center text-black text-md">
								作品を削除するよ
								<br />
								元に戻せないから注意してね！
								<FaRegTrashAlt className="mx-auto my-[65px] text-9xl text-black" />
							</DialogDescription>

							<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
								<Button
									type="button"
									variant="default"
									onClick={handleDelete}
									className="font-bold"
								>
									削除する
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => console.log("キャンセルボタンが押されました")}
									className="border-2 border-black border-solid font-bold"
								>
									キャンセル
								</Button>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</article>
	);
}
