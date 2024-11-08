import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default async function Header() {
	const session = await auth();
	console.log(session);
	return (
		<header className="h-[100px]">
			<div className="container mx-auto flex h-full items-center justify-between">
				<Link href="/">
					<Image src="/logo.png" alt="" width={209} height={33} />
				</Link>
				{!session && (
					<form
						action={async () => {
							"use server";
							await signIn("google");
						}}
					>
						<Button variant="ghost" className="text-[20px]">
							ログイン
						</Button>
					</form>
				)}
				{session && (
					<div className="flex items-center gap-7">
						<ul className="flex gap-5">
							<li>ホーム</li>
							<li>つくる</li>
							<li>お気に入り</li>
							<li>自分の作品</li>
							<li>みんなの作品</li>
						</ul>
						<Popover>
							<PopoverTrigger asChild>
								<Avatar>
									<AvatarImage
										src={session.user?.image as string}
										alt={session.user?.name as string}
									/>
									<AvatarFallback>{session.user?.name}</AvatarFallback>
								</Avatar>
							</PopoverTrigger>
							<PopoverContent className="w-[250px] p-0" align="end">
								<ul className="space-y-7 p-8">
									<li className="flex items-center gap-3">
										<Avatar>
											<AvatarImage
												src={session.user?.image as string}
												alt={session.user?.name as string}
											/>
											<AvatarFallback>{session.user?.name}</AvatarFallback>
										</Avatar>
										<p>{session.user?.name}</p>
									</li>
									<li>
										<form
											action={async () => {
												"use server";
												await signOut();
											}}
										>
											<button
												className="flex w-full items-center justify-start gap-3"
												type="submit"
											>
												<PiSignOut size={25} />
												ログアウト
											</button>
										</form>
									</li>
								</ul>
							</PopoverContent>
						</Popover>
					</div>
				)}
			</div>
		</header>
	);
}
