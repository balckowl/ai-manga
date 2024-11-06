import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<header className="h-[100px]">
			<div className="container mx-auto flex h-full items-center justify-between">
				<Image src="/logo.png" alt="" width={209} height={33} />
				<Button variant="ghost" className="text-[20px]">
					ログイン
				</Button>
			</div>
		</header>
	);
}
