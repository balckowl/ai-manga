import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function StartButton({ children }: Props) {
	return (
		<button
			type="button"
			className="rounded-xl border-[3px] border-black border-b-[6px] border-solid bg-white px-10 py-1 font-bold text-[26px] text-black hover:mt-[3px] hover:border-b-[3px]"
		>
			{children}
		</button>
	);
}
