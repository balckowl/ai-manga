import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="mx-auto flex h-[calc(100vh-200px)] w-[90%] items-center justify-center">
			<div>
				<div className="relative">
					<Image src="/404hukidashi.png" width={400} height={200} alt="" className="mx-auto" />
					<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-80%] text-center">
						<h1 className="mx-auto font-bold text-8xl">404</h1>
					</div>
				</div>
				<div className="text-center font-bold">
					<h2 className="text-3xl lg:text-5xl">お探しのページは見つかりませんでした</h2>
					<p className="p-6 text-xl lg:text-2xl">ご迷惑をおかけして申し訳ございません。</p>
				</div>
				<div className="flex justify-center pt-10">
					<Button className="h-[50px] w-[300px] font-bold text-xl">
						<Link href="/">トップへ戻る</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
