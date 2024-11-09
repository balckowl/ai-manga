"use client";

import PostCompleted from "@/components/post-completed";
import PostEdit from "@/components/post-edit";
import PostNew from "@/components/post-new";
import { useState } from "react";

export default function Page() {

	const [stage, setStage] = useState("new");

	const handleImageUploadSuccess = () => setStage("edit");
	const handleEditCompleted = () => setStage("completed");


	return (
		<>
			{ stage === "new" && <PostNew onImageUploadSuccess={handleImageUploadSuccess} />}
			{ stage === "edit" && <PostEdit onEditCompleted={handleEditCompleted} />}
			{ stage === "completed" && <PostCompleted />}
		</>
	);
}
