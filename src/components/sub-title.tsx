import Image from "next/image";

type Props = {
	title: string;
};

export default function SubTitle({ title }: Props) {
	return (
		<div className="relative mb-[45px] flex justify-center">
			<Image src="/title-kirinuki.png" width={500} height={100} alt="" />
			<h3 className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-65%] text-center font-bold text-[25px] lg:text-[30px]">
				{title}
			</h3>
		</div>
	);
}
