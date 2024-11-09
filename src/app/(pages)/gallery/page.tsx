import { auth } from "@/auth";
import GalleryManga from "@/components/gallery-manga";
import SubTitle from "@/components/sub-title";
import { getAllMyComics } from "@/data/comic";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) redirect("/");
	const allMyComics = await getAllMyComics(session.user?.id as string);
	return (
		<div className="container mx-auto pt-[50px]">
			<SubTitle title="自分が作った作品" />
			<div className="mx-auto my-7 grid w-[95%] grid-cols-1 gap-9 md:grid-cols-3">
				{allMyComics.map((myComic, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<GalleryManga key={i} myComic={myComic} />
				))}
			</div>
		</div>
	);
}
