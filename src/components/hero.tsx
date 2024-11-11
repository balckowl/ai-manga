import Image from "next/image";
import Link from "next/link";
import StartButton from "./start-button";

export default function Hero() {
	return (
		<div className="mx-auto flex w-[90%] items-center justify-center lg:mb-[100px] lg:h-[calc(100dvh-200px)]">
			<div>
				<div className="relative">
					<Link href="/">
						<Image src="/hukidasi.png" width={1200} height={650} alt="" />
					</Link>
					<div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-30%] text-center lg:translate-y-[-50%]">
						<Image
							src="/title.png"
							width={600}
							height={650}
							alt=""
							className="mx-auto mb-[45px] w-[200px] lg:w-[600px]"
						/>
						<p className="mb-[20px] hidden font-bold text-[28px] lg:block">
							あなただけの4コマ漫画を、AIと共に。
						</p>
						<p className="mx-auto mb-[28px] hidden w-[850px] font-bold text-[#808080] text-[18px] leading-8 lg:block">
							みなさんのスマホにはたくさんの写真があると思います。例えば、何気ない友達との写真や、ペットの面白い表情、日常のワンシーン…
							そんな写真を使って、あなただけの四コマ漫画が作れるとしたら？
						</p>
						<div className="hidden lg:block">
							<StartButton>はじめる</StartButton>
						</div>
					</div>
				</div>
				<h2 className="mb-[10px] text-center font-bold text-[24px] lg:hidden">
					あなただけの4コマ漫画を、AIと共に。
				</h2>
				<p className="mb-[10px] text-[12px] lg:hidden">
					みなさんのスマホにはたくさんの写真があると思います。例えば、何気ない友達との写真や、
					ペットの面白い表情、日常のワンシーン…
					そんな写真を使って、あなただけの四コマ漫画が作れるとしたら？
				</p>
				<div className="lg:hidden">
					<StartButton>はじめる</StartButton>
				</div>
			</div>
		</div>
	);
}
