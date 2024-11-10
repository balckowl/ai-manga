"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
	return (
		<div className="flex h-[calc(100vh-200px)] items-center justify-center text-center">
			<div className="space-y-7 font-bold">
				<div className="flex justify-center">
					<Image src="/error.png" alt="" width={150} height={150} />
				</div>
				<h1 className="text-3xl">エラーが発生しました</h1>
				<div className="space-y-4">
					<p>
						申し訳ございません <br /> リクエストを正しく処理 <br />
						できませんでした。
					</p>
					<p>(エラーコード: {error.name})</p>
				</div>
				<Button className="mx-auto h-[40px] w-[200px] font-bold">
					<Link href="/">トップへ戻る</Link>
				</Button>
			</div>
		</div>
	);
}
