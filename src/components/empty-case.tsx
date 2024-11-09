import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function EmptyCase() {
	return (
		<div className="space-y-10 text-center">
			<div className="flex justify-center">
				<Image src="/emptylocket.png" alt="" width={150} height={150} />
			</div>
			<div className="space-y-3">
				<h1 className="font-bold text-3xl">まだ、作品がないみたい</h1>
				<p>
					作品を作ったらここに表示されるよ <br /> [あたらしくつくる]から作品を作ろう！
				</p>
			</div>
			<Button className="h-[40px] w-[200px] font-bold">
				<Link href="/new">あたらしくつくる</Link>
			</Button>
		</div>
	);
}
