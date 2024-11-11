import { auth } from "@/auth";
import EmptyCase from "@/components/empty-case";
import GalleryManga from "@/components/gallery-manga";
import SubTitle from "@/components/sub-title";
import { getAllMyComics } from "@/data/comic";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) redirect("/");
	const allMyComics = await getAllMyComics(session.user?.id as string);
	return (
		<div className="mx-auto w-[90%] pt-[70px] pb-[100px] lg:pt-[100px] ">
			<SubTitle title="自分が作った作品" />
			{allMyComics.length === 0 && <EmptyCase />}
			{allMyComics.length > 0 && (
				<div className="mx-auto grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
					{allMyComics.map((myComic, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<GalleryManga key={i} myComic={myComic} />
					))}
				</div>
			)}
		</div>
	);
}
