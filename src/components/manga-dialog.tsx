"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { SelectComic, SelectUser } from "@/db/schema";
import { type ReactNode, useState } from "react";
import Manga from "./manga";
import { Button } from "./ui/button";

type Props = {
	comicWithAuthor: { user: SelectUser | null } & { comic: SelectComic };
	children: ReactNode;
};

export default function MangaDialog({ children, comicWithAuthor }: Props) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { comic } = comicWithAuthor;
	const { contents, title } = comic;

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger className="w-full">{children}</DialogTrigger>
			<DialogContent className="w-[95%] rounded-md">
				<DialogTitle className="text-center">作品の閲覧</DialogTitle>
				<div className="mx-auto w-[300px] sm:w-[450px]">
					<Manga title={title} contents={contents} />
				</div>
				<Button className="mx-auto w-[250px] font-bold" onClick={() => setIsDialogOpen(false)}>
					閉じる
				</Button>
			</DialogContent>
		</Dialog>
	);
}
