import Image from "next/image";

type Props = {
	title: string;
};

export default function SubTitle({ title }: Props) {
	return (
		<div className="relative mb-[45px] flex justify-center">
			<Image src="/title-kirinuki.png" width={500} height={100} alt="" />
			<h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] font-bold text-[30px]">
				{title}
			</h3>
		</div>
	);
}
