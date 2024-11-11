"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SelectComic } from "@/db/schema";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { type ControllerRenderProps, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "./loading";

type Props = {
	onImageUploadSuccess: () => void;
	getComicsData: (comics: SelectComic["contents"]) => void;
};

export default function PostNew({ onImageUploadSuccess, getComicsData }: Props) {
	const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null, null, null]);
	const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);

	const formSchema = z.object({
		images: z.array(z.instanceof(File)).length(4, "4枚の画像を選択してください"),
	});

	type FormSchemaType = z.infer<typeof formSchema>;

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
		},
		mode: "onChange",
	});

	const handleImageChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// フォーム用
			const newImages = [...form.getValues("images")];
			newImages[index] = file;
			form.setValue("images", newImages, { shouldValidate: true });
			console.log(form.getValues("images"));

			// プレビュー用
			const newImageUrls = [...imageUrls];
			newImageUrls[index] = URL.createObjectURL(file);
			setImageUrls(newImageUrls);

			// supabase用
			const newFiles = [...files];
			newFiles[index] = file;
			setFiles(newFiles);
		}
	};

	const submitImages = async () => {
		const urls: string[] = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file) {
				const fileName = `image-${Date.now()}-${i}.jpg`;
				const { data, error } = await supabase.storage
					.from("comic-images")
					.upload(`public/${fileName}`, file);

				if (error) {
					console.error("Error uploading image:", error.message);
					continue;
				}

				const { data: publicUrlData } = supabase.storage
					.from("comic-images")
					.getPublicUrl(data.path);
				const url = publicUrlData?.publicUrl;
				if (url) {
					urls.push(url);
				}
			}
		}

		const res = await fetch("/api/gemini", {
			method: "POST",
			body: JSON.stringify({ images: urls }),
		});

		const comics = await res.json();

		getComicsData(comics.contents);

		console.log("Uploaded image URLs:", urls);
	};

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		console.log("フォームの内容が送信されました：", data);

		await submitImages();
		onImageUploadSuccess();
	};

	const handleReset = () => {
		setFiles([null, null, null, null]);
		setImageUrls([null, null, null, null]);
	};

	return (
		<>
			{form.formState.isSubmitting && <Loading text="執筆中..." />}
			{!form.formState.isSubmitting && (
				<div className="mx-auto flex w-[90%] items-center pb-[100px] lg:h-[calc(100vh-200px)] lg:pb-0">
					<div className="container mx-auto">
						<div className="mb-[30px] text-center">
							<h2 className="mb-[2px] font-bold text-[35px]">マンガに使う画像を4枚決めよう</h2>
							<p className="text-[14px]">
								選択した画像の順番のままマンガを作るから、えらぶ順番に注意してね
							</p>
						</div>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="mx-auto mb-[30px] flex flex-col flex-wrap gap-4 lg:w-[820px] lg:flex-row">
									{imageUrls.map((image, index) => (
										<FormField
											control={form.control}
											name={`images.${index}`}
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={`images.${index}`}
											render={({
												field,
											}: { field: ControllerRenderProps<FormSchemaType, `images.${number}`> }) => (
												<div className="relative flex h-[240px] w-full items-center justify-center overflow-hidden border-[3px] border-black lg:w-[400px]">
													{image ? (
														<Image
															src={image}
															alt={`Selected ${index + 1}`}
															width={400}
															height={240}
															className="h-[240px] object-contain"
															priority
														/>
													) : (
														<Image
															src="/add-image-image.png"
															width={150}
															height={150}
															alt="Add image placeholder"
															priority
														/>
													)}
													<Input
														type="file"
														accept="image/*"
														// onChange={(e) => handleImageChange(index, e)}
														onChange={(e) => {
															field.onChange(e);
															handleImageChange(index, e);
														}}
														className="absolute inset-0 h-full cursor-pointer opacity-0"
													/>
													<p className="absolute right-5 bottom-3 font-bold">{index + 1}</p>
												</div>
											)}
										/>
									))}
								</div>

								<div className="flex justify-center gap-4">
									<Button
										type="submit"
										className="w-[200px] font-bold"
										disabled={!form.formState.isValid || form.formState.isSubmitting}
									>
										生成する
									</Button>
									<Button
										type="button"
										className=" w-[200px] border-2 border-black border-solid font-bold"
										variant="outline"
										onClick={handleReset}
									>
										キャンセル
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			)}
		</>
	);
}
