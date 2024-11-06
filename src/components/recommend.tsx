import Image from "next/image";
import Link from "next/link";
import StartButton from "./start-button";

export default function Recommend() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="relative">
				<Image src="/recommend-hukidasi.png" width={750} height={500} className="mx-auto" alt="" />
				<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
					<Image src="/title.png" width={450} height={200} alt="" className="mx-auto mb-[35px]" />
					<StartButton>
						<Link href="/">はじめる</Link>
					</StartButton>
				</div>
			</div>
			<div className="mt-[100px]">
				<p className="text-center font-bold text-[50px]">みんなでつくると、もっとたのしい！</p>
				<p className="text-center font-bold text-[26px]">キミの「自由な発想」を待ってるよ！</p>
			</div>
		</div>
	);
}
