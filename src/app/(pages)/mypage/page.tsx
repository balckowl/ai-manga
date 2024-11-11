import { auth } from "@/auth";
import MangaIchiran from "@/components/manga-ichiran";
import { Button } from "@/components/ui/button";
import { getNewComics } from "@/data/comic";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyPage() {
	const session = await auth();
	if (!session) redirect("/");
	const comicsWithAuthor = await getNewComics();

	return (
		<div className="pb-[100px]">
			<div className="mx-auto w-[90%] py-10 text-center font-bold">
				<div className="mb-14">
					<h1 className="p-4 text-4xl lg:text-5xl">{session?.user?.name}先生、おかえり！</h1>
					<p className="text-[20px]">画像を４枚用意して、はじめよう。</p>
				</div>
				<div className="mb-20 flex flex-col justify-center gap-2 md:flex-row md:gap-5">
					<Button className="h-[60px] w-full font-bold text-xl lg:w-[270px]">
						<Link href="/new">あたらしくつくる</Link>
					</Button>
					<Button
						variant="outline"
						className="h-[60px] w-full border-2 border-black border-solid font-bold text-xl lg:w-[270px]"
					>
						<Link href="/community">みんなの作品を見る</Link>
					</Button>
				</div>
				<hr className="container mx-auto border-t-2" />
			</div>
			<div className="mx-auto w-[90%]">
				<MangaIchiran title="人気作品" comicsWithAuthor={comicsWithAuthor} />
				<MangaIchiran title="新着一覧" comicsWithAuthor={comicsWithAuthor} />
			</div>
		</div>
	);
}
