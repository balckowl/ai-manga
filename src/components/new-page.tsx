"use client";

import PostCompleted from "@/components/post-completed";
import PostEdit from "@/components/post-edit";
import PostNew from "@/components/post-new";
import type { SelectComic } from "@/db/schema";
import { useState } from "react";

type Props = {
	userId: string;
};

export default function NewPage({ userId }: Props) {
	const [stage, setStage] = useState("new");
	const [comics, setComics] = useState<SelectComic["contents"]>([
		{ img: "", text: "" },
		{ img: "", text: "" },
		{ img: "", text: "" },
		{ img: "", text: "" },
	]);

	const handleImageUploadSuccess = () => setStage("edit");
	const handleBackToNew = () => setStage("new");
	const handleEditCompleted = () => setStage("completed");
	const getComicsData = (comics: SelectComic["contents"]) => setComics(comics);

	return (
		<>
			{stage === "new" && (
				<PostNew onImageUploadSuccess={handleImageUploadSuccess} getComicsData={getComicsData} />
			)}
			{stage === "edit" && (
				<PostEdit onEditCompleted={handleEditCompleted} backToNew={handleBackToNew} comics={comics} userId={userId} />
			)}
			{stage === "completed" && <PostCompleted />}
		</>
	);
}
