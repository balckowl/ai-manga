import { getAllComics } from "@/data/comic";

export default async function Page() {
	const res = await getAllComics();
	console.log(JSON.stringify(res, null, 2));
}
