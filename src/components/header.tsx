import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const menuItem = [
	{ href: "/mypage", name: "ホーム" },
	{ href: "/new", name: "つくる" },
	{ href: "/likes", name: "お気に入り" },
	{ href: "/gallery", name: "自分の作品" },
	{ href: "/community", name: "みんなの作品" },
];

export default async function Header() {
	const session = await auth();
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
						<Button variant="ghost" className="text-[20px]" type="submit">
							ログイン
						</Button>
					</form>
				)}
				{session && (
					<div className="flex items-center gap-7">
						<ul className="flex items-center gap-5">
							{menuItem.map((item) => (
								<li key={item.name}>
									<Button variant="link" asChild>
										<Link href={item.href}>{item.name}</Link>
									</Button>
								</li>
							))}
						</ul>
						<Popover>
							<PopoverTrigger type="button">
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
