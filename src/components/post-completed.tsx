"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PostCompleted() {
	return (
		<div className="flex h-[calc(100vh-200px)] items-center justify-center">
			<div className="relative">
				<Image src="/hukidasicomp.png" width={650} height={240} alt="" />
				<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-450%] text-center">
					<p className="font-bold text-5xl">キミの作品を公開したよ</p>
				</div>
				<div className="p-7 text-center font-bold text-3xl leading-10">
					<h2>
						おめでとう！ <br /> キミの作品は無事公開されたよ
					</h2>
					<h2 className="p-10">
						もっとたくさん作品を作ったり <br /> 他の人の作品を見たりして <br /> たのしんでね！
					</h2>
				</div>
				<div className="flex justify-center gap-5">
					<Button className="h-[50px] w-[250px] font-bold text-xl">もっとつくる</Button>
					<Button className="h-[50px] w-[250px] border-4 border-black bg-white font-bold text-black text-xl hover:bg-gray-200">
						みんなの作品を見る
					</Button>
				</div>
			</div>
		</div>
	);
}
