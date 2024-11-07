import { Button } from "@/components/ui/button";

export default function MyPage() {
	return (
		<div className="flex h-[calc(100vh-200px)] items-center justify-center">
			<div className="container mx-auto text-center font-bold">
				<h1 className="p-4 text-5xl">name、おかえり！</h1>
				<p>あたらしいアイデアは浮かんだ？</p>
				<div className="flex justify-center gap-5 pt-14">
					<Button className="h-[50px] w-[250px] font-bold text-xl">あたらしくつくる</Button>
					<Button className="h-[50px] w-[250px] border-4 border-black bg-white font-bold text-black text-xl hover:bg-gray-200">
						みんなの作品を見る
					</Button>
				</div>
				<hr className="container mx-auto mt-20 border-t-2" />
			</div>
		</div>
	);
}
