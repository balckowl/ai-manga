import { auth } from "@/auth";
import MangaIchiran from "@/components/manga-ichiran";
import { Button } from "@/components/ui/button";
import { getNewComics } from "@/data/comic";

export default async function MyPage() {
	const session = await auth();
	const comicsWithAuthor = await getNewComics();

	return (
		<div className="pb-[100px]">
			<div className="container mx-auto py-10 text-center font-bold">
				<div className="mb-14">
					<h1 className="p-4 text-5xl">{session?.user?.name}、おかえり！</h1>
					<p className="text-[20px]">あたらしいアイデアは浮かんだ？</p>
				</div>
				<div className="mb-20 flex justify-center gap-5">
					<Button className="h-[50px] w-[250px] font-bold text-xl">あたらしくつくる</Button>
					<Button variant="ghost" className="h-[50px] w-[250px] font-bold text-xl">
						みんなの作品を見る
					</Button>
				</div>
				<hr className="container mx-auto border-t-2" />
			</div>

			<MangaIchiran title="いいね数の多い作品" comicsWithAuthor={comicsWithAuthor} />
			<MangaIchiran title="新着一覧" comicsWithAuthor={comicsWithAuthor} />
		</div>
	);
}
