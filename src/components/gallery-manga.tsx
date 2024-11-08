"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegTrashAlt } from "react-icons/fa";
import Manga from "./manga";

import { Button } from "@/components/ui/button";

type Coma = {
	text: string;
	imageUrl: string;
};

type Props = {
	comaList: Coma[];
};

export default function GalleryManga({ comaList }: Props) {
	return (
		<article>
			<Manga title="こんにちは" comaList={comaList} />
			<div className="flex justify-between">
				<time dateTime="2022-11-07">2022/11/07</time>
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
									onClick={() => console.log("削除するボタンが押されました")}
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
