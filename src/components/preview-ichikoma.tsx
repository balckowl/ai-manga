"use client";

import Image from "next/image";

type Props = {
	content: {
		img: string;
		text: string;
	};
};

export default function PreviewIchikoma({ content }: Props) {
	return (
		<>
			<div className="relative mx-auto mt-2 min-h-[420px] w-full rounded-md border-[3px] border-black">
				<Image src={content.img} layout="fill" objectFit="contain" alt={content.text} />
				<div className="absolute top-0 right-0 z-[10] flex h-[320px] w-[120px] items-center justify-center border-black border-b-[3px] border-l-[3px] bg-white p-3 [writing-mode:vertical-rl]">
					{content.text}
				</div>
			</div>
		</>
	);
}
