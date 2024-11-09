"use client";

import PostCompleted from "@/components/post-completed";
import PostEdit from "@/components/post-edit";
import PostNew from "@/components/post-new";
import type { SelectComic } from "@/db/schema";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState("new");
	const [comics, setComics] = useState<SelectComic["contents"]>([
		{ img: "", text: "" },
		{ img: "", text: "" },
		{ img: "", text: "" },
		{ img: "", text: "" },
	]);

	const handleImageUploadSuccess = () => setStage("edit");
	const handleEditCompleted = () => setStage("completed");
	const getComicsData = (comics: SelectComic["contents"]) => setComics(comics);

	return (
		<>
			{stage === "new" && (
				<PostNew onImageUploadSuccess={handleImageUploadSuccess} getComicsData={getComicsData} />
			)}
			{stage === "edit" && (
				<PostEdit
					onEditCompleted={handleEditCompleted}
					comics={comics}
					getComicsData={getComicsData}
				/>
			)}
			{stage === "completed" && <PostCompleted />}
		</>
	);
}
