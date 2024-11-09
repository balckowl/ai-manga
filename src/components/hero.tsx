import Image from "next/image";
import Link from "next/link";
import StartButton from "./start-button";

export default function Hero() {
	return (
		<div className="mb-[100px] flex h-[calc(100vh-200px)] items-center justify-center">
			<div className="relative">
				<Link href="/">
					<Image src="/hukidasi.png" width={1200} height={650} alt="" />
				</Link>
				<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
					<Image src="/title.png" width={600} height={650} alt="" className="mx-auto mb-[45px]" />
					<p className="mb-[20px] font-bold text-[28px]">あなただけの4コマ漫画を、AIと共に。</p>
					<p className="mx-auto mb-[28px] w-[850px] font-bold text-[#808080] text-[18px] leading-8">
						独創的な４コマ漫画を作り出す冒険に、あなたも参加しませんか？起承転結、それぞれの瞬間を選び、
						AIの力を借りて物語を紡ぎ出します。ここでは、選んだ画像が言葉に変わり、一つの物語が生まれます。
						画像を選ぶことから始まる創作の旅で、あなただけのオリジナル漫画を作りましょう。
					</p>
					<StartButton>はじめる</StartButton>
				</div>
			</div>
		</div>
	);
}
