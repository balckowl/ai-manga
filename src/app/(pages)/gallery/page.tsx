import GalleryManga from "@/components/gallery-manga";
import { comaList } from "@/lib/dummy-data";
import Image from "next/image";

export default function Page() {
	return (
		<div className="container mx-auto">
			<h2 className="relative">
				<Image
					className="pointer-events-none mx-auto select-none"
					src="/gallery-fukidashi.png"
					width={534}
					height={127}
					alt=""
				/>
				<div className="absolute top-[46%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
					<p className="font-bold text-3xl sm:text-4xl">自分でつくった作品</p>
				</div>
			</h2>

			<div className="mx-auto my-7 grid w-[95%] grid-cols-1 gap-9 md:grid-cols-3">
				{[...new Array(12)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<GalleryManga comaList={comaList} key={i} />
				))}
			</div>
		</div>
	);
}
