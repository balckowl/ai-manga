import { auth } from "@/auth";
import NewPage from "@/components/new-page";

export default async function Page() {
	const session = await auth();

	if (!session) return <p>認証して</p>;

	return <NewPage userId={session.user?.id as string} />;
}
