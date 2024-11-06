import { comaList } from "@/lib/dummy-data";
import Image from "next/image";
import Manga from "./manga";

type Props = {
	title: string;
};

export default function NinkiIchiran({ title }: Props) {
	return (
		<div className="container mx-auto pt-[100px]">
			<div className="relative mb-[45px] flex justify-center">
				<Image src="/title-kirinuki.png" width={500} height={100} alt="" />
				<h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] font-bold text-[30px]">
					{title}
				</h3>
			</div>
			<div className="grid grid-cols-3 gap-9">
				{[...new Array(6)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Manga title="こんにちは" comaList={comaList} key={i} />
				))}
			</div>
		</div>
	);
}
