import MangaIchiran from "@/components/manga-ichiran";
import { getAllComics } from "@/data/comic";

export default async function Page() {

    const allComics = await getAllComics();

    return (
        <>
            <div className="container mx-auto w-[90%]">
                <MangaIchiran title="みんながつくった作品" comicsWithAuthor={allComics} />
            </div>
        </>
    )    
}