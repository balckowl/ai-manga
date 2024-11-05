export default function Header() {
	return (
		<header className="h-7 bg-stone-500 text-white">
			<div className="container mx-auto flex h-full items-center justify-between gap-4">
				<h1>manga</h1>
				<ul className="flex gap-3">
					<li>about</li>
					<li>gallery</li>
					<li>community</li>
				</ul>
			</div>
		</header>
	);
}
