import { auth } from "@/auth";
import GalleryManga from "@/components/gallery-manga";
import SubTitle from "@/components/sub-title";
import { Button } from "@/components/ui/button";
import { getAllMyComics } from "@/data/comic";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) redirect("/");
	const allMyComics = await getAllMyComics(session.user?.id as string);
	return (
		<div className="container mx-auto pt-[50px]">
			<SubTitle title="自分が作った作品" />
			{allMyComics.length === 0 && (
				<div className="space-y-10 text-center">
					<div className="flex justify-center">
						<Image src="/emptylocket.png" alt="" width={150} height={150} />
					</div>
					<div className="space-y-3">
						<h1 className="font-bold text-3xl">まだ、作品がないみたい</h1>
						<p>
							作品を作ったらここに表示されるよ <br /> [あたらしくつくる]から作品を作ろう！
						</p>
					</div>
					<Button className="h-[40px] w-[200px] font-bold">
						<Link href="/new">あたらしくつくる</Link>
					</Button>
				</div>
			)}
			,
			{allMyComics.length > 0 && (
				<div className="mx-auto my-7 grid w-[95%] grid-cols-1 gap-9 md:grid-cols-3">
					{allMyComics.map((myComic, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<GalleryManga key={i} myComic={myComic} />
					))}
				</div>
			)}
		</div>
	);
}
