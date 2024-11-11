import Image from "next/image";
import StartButton from "./start-button";

export default function Recommend() {
	return (
		<div className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center">
			<div className="relative">
				<Image src="/recommend-hukidasi.png" width={750} height={500} className="mx-auto" alt="" />
				<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-70%] text-center lg:translate-y-[-50%]">
					<Image
						src="/title.png"
						width={450}
						height={200}
						alt=""
						className="mx-auto w-[200px] lg:mb-[35px] lg:w-[450px]"
					/>
					<div className="hidden lg:block">
						<StartButton>はじめる</StartButton>
					</div>
				</div>
			</div>
			<div className="mt-[30px] lg:mt-[100px]">
				<p className="mb-2 text-center font-bold text-[35px] lg:text-[50px]">
					みんなでつくると、もっとたのしい！
				</p>
				<p className="text-center font-bold text-[20px] lg:text-[26px]">
					キミが用意した画像で4コマ漫画を作ろう
				</p>
			</div>
		</div>
	);
}
