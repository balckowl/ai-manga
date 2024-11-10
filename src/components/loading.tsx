"use client";

type Props = {
	text: string;
};

export default function Loading({ text }: Props) {
	return (
		<div className="grid h-[calc(100vh-200px)] place-items-center">
			<div className="flex flex-col items-center justify-center" aria-label="ロード中です！">
				<h2 className="font-bold text-[30px]">{text}</h2>
				<div className="mt-5 h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
			</div>
		</div>
	);
}
