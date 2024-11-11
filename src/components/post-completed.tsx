"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
	handleBackToNew: () => void;
};

export default function PostCompleted({ handleBackToNew }: Props) {
	return (
		<div className="mx-auto flex h-[calc(100vh-200px)] w-[90%] items-center justify-center">
			<div>
				<div className="mb-[20px] flex justify-center">
					<FaRegCheckCircle size={120} />
				</div>
				<h2 className="mb-[20px] text-center font-bold text-[35px]">公開が完了したよ！</h2>
				<p className="mb-[30px] text-center">
					もっとたくさん作品を作ったり
					<br />
					ほかの人がつくった作品を見たりして
					<br />
					たのしんでね！
				</p>
				<div className="flex flex-col justify-center gap-2 md:flex-row md:gap-4">
					<Button type="submit" className="w-full font-bold md:w-[200px]" onClick={handleBackToNew}>
						もっと作る
					</Button>
					<Button
						type="button"
						className="w-full border-2 border-black border-solid font-bold md:w-[200px]"
						variant="outline"
					>
						<Link href="/community">みんなの作品を見る</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
