import { auth } from "@/auth";
import NewPage from "@/components/new-page";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) redirect("/");

	return <NewPage userId={session.user?.id as string} />;
}
