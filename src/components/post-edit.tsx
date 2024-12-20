"use client";

import Manga from "@/components/manga";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SelectComic } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type ControllerRenderProps, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "./loading";
import PreviewIchikoma from "./preview-ichikoma";

const mangaFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "タイトルを入力してください" })
		.max(20, { message: "20文字以内で入力してください。" }),
	firstComa: z
		.string()
		.min(1, { message: "文章を入力してください" })
		.max(50, { message: "50文字以内で入力してください。" }),
	secondComa: z
		.string()
		.min(1, { message: "文章を入力してください" })
		.max(50, { message: "50文字以内で入力してください。" }),
	thirdComa: z
		.string()
		.min(1, { message: "文章を入力してください" })
		.max(50, { message: "50文字以内で入力してください。" }),
	fourthComa: z
		.string()
		.min(1, { message: "文章を入力してください" })
		.max(50, { message: "50文字以内で入力してください。" }),
});

type MangaFormSchemaType = z.infer<typeof mangaFormSchema>;

type Props = {
	comics: SelectComic["contents"];
	onEditCompleted: () => void;
	backToNew: () => void;
	userId: string;
};

export default function PostEdit({ comics, onEditCompleted, backToNew, userId }: Props) {
	const [title, setTitle] = useState("");
	const [firstComa, setFirstComa] = useState(comics[0].text);
	const [secondComa, setSecondComa] = useState(comics[1].text);
	const [thirdComa, setThirdComa] = useState(comics[2].text);
	const [fourthComa, setFourthComa] = useState(comics[3].text);

	const [isDialogOpen, setIsOpen] = useState(false);

	const form = useForm<MangaFormSchemaType>({
		defaultValues: {
			title,
			firstComa,
			secondComa,
			thirdComa,
			fourthComa,
		},
		resolver: zodResolver(mangaFormSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<MangaFormSchemaType> = async (data) => {
		console.log("フォームの内容が送信されました：", data);
		setIsOpen(false);

		const res = await fetch("/api/post", {
			method: "POST",
			body: JSON.stringify({
				userId,
				title,
				contents: [
					{ text: data.firstComa, img: comics[0].img },
					{ text: data.secondComa, img: comics[1].img },
					{ text: data.thirdComa, img: comics[2].img },
					{ text: data.fourthComa, img: comics[3].img },
				],
			}),
		});

		const fetchData = await res.json();
		console.log(fetchData);
		onEditCompleted();
	};

	return (
		<>
			{form.formState.isSubmitting && <Loading text="公開中..." />}

			{!form.formState.isSubmitting && (
				<div className="mx-auto max-w-[800px]">
					<div className="mx-auto w-[95%]">
						<div className="text-center">
							<h2 className="mt-8 font-bold text-2xl md:text-4xl" style={{ wordBreak: "keep-all" }}>
								文章を修正して
								<wbr />
								もっとおもしろくしよう！
							</h2>
							<p className="mt-2 text-sm md:mt-4 md:text-base">
								タイトルとマンガのなかの文字を変更できるよ
								<br />
								個人情報などは含めないように注意してね。
							</p>
						</div>

						<Form {...form}>
							<form className="mx-auto mt-2 w-[90%]" onSubmit={form.handleSubmit(onSubmit)}>
								<div>
									<FormField
										control={form.control}
										name="title"
										render={({
											field,
										}: { field: ControllerRenderProps<MangaFormSchemaType, "title"> }) => (
											<FormItem>
												<FormLabel htmlFor="title" className="font-bold">
													タイトル
												</FormLabel>
												{form.formState.errors.title && (
													<p className="text-red-500">{form.formState.errors.title.message}</p>
												)}
												<FormControl>
													<Input
														{...field}
														id="title"
														className="border-2 border-black border-solid p-5"
														onChange={(e) => {
															field.onChange(e);
															setTitle(e.target.value);
														}}
														placeholder="タイトルを入力"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="mt-4">
									<FormField
										control={form.control}
										name="firstComa"
										render={({
											field,
										}: { field: ControllerRenderProps<MangaFormSchemaType, "firstComa"> }) => (
											<FormItem>
												<FormLabel htmlFor="firstComa" className="font-bold">
													1コマ目
												</FormLabel>
												<PreviewIchikoma content={{ img: comics[0].img, text: firstComa }} />
												{form.formState.errors.firstComa && (
													<p className="text-red-500">{form.formState.errors.firstComa.message}</p>
												)}
												<FormControl>
													<Textarea
														{...field}
														id="firstComa"
														className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3"
														onChange={(e) => {
															field.onChange(e);
															setFirstComa(e.target.value);
														}}
														placeholder="文章を入力"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="mt-4">
									<FormField
										control={form.control}
										name="secondComa"
										render={({
											field,
										}: { field: ControllerRenderProps<MangaFormSchemaType, "secondComa"> }) => (
											<FormItem>
												<FormLabel htmlFor="secondComa" className="font-bold">
													2コマ目
												</FormLabel>
												<PreviewIchikoma content={{ img: comics[1].img, text: secondComa }} />
												{form.formState.errors.secondComa && (
													<p className="text-red-500">{form.formState.errors.secondComa.message}</p>
												)}
												<FormControl>
													<Textarea
														{...field}
														id="secondComa"
														className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3"
														onChange={(e) => {
															field.onChange(e);
															setSecondComa(e.target.value);
														}}
														placeholder="文章を入力"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="mt-4">
									<FormField
										control={form.control}
										name="thirdComa"
										render={({
											field,
										}: { field: ControllerRenderProps<MangaFormSchemaType, "thirdComa"> }) => (
											<FormItem>
												<FormLabel htmlFor="thirdComa" className="font-bold">
													3コマ目
												</FormLabel>
												<PreviewIchikoma content={{ img: comics[2].img, text: thirdComa }} />
												{form.formState.errors.thirdComa && (
													<p className="text-red-500">{form.formState.errors.thirdComa.message}</p>
												)}
												<FormControl>
													<Textarea
														{...field}
														id="thirdComa"
														className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3"
														onChange={(e) => {
															field.onChange(e);
															setThirdComa(e.target.value);
														}}
														placeholder="文章を入力"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="mt-4">
									<FormField
										control={form.control}
										name="fourthComa"
										render={({
											field,
										}: { field: ControllerRenderProps<MangaFormSchemaType, "fourthComa"> }) => (
											<FormItem>
												<FormLabel htmlFor="fourthComa" className="font-bold">
													4コマ目
												</FormLabel>
												<PreviewIchikoma content={{ img: comics[3].img, text: fourthComa }} />
												{form.formState.errors.fourthComa && (
													<p className="text-red-500">{form.formState.errors.fourthComa.message}</p>
												)}
												<FormControl>
													<Textarea
														{...field}
														id="fourthComa"
														className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3"
														onChange={(e) => {
															field.onChange(e);
															setFourthComa(e.target.value);
														}}
														placeholder="文章を入力"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="my-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
									<Dialog open={isDialogOpen} onOpenChange={setIsOpen}>
										<DialogTrigger asChild>
											<Button
												type="button"
												variant="default"
												className="py-6 font-bold text-xl"
												disabled={!form.formState.isValid}
											>
												確認する
											</Button>
										</DialogTrigger>

										<DialogContent className="h-[95svh] max-h-[700px] w-[95%] overflow-y-auto rounded-md">
											<DialogTitle className="mx-auto text-center">作品の公開</DialogTitle>
											<div className="text-center text-black">
												<p className="font-bold text-2xl md:text-4xl">最終確認をしよう！</p>
												<p className="mt-2">これを公開してもいいかな？</p>
											</div>

											<div className="mx-auto w-[300px] sm:w-[450px]">
												<Manga
													title={title}
													contents={[
														{ img: comics[0].img, text: firstComa },
														{ img: comics[1].img, text: secondComa },
														{ img: comics[2].img, text: thirdComa },
														{ img: comics[3].img, text: fourthComa },
													]}
												/>
											</div>

											<div className="mx-auto w-[300px] rounded-md bg-gray-300 p-4 text-center sm:w-[450px]">
												<p>公開される情報</p>
												<ul>
													<li className="mt-2">・アカウントの表示名</li>
												</ul>
											</div>

											<div className="mx-auto grid w-[300px] grid-cols-1 gap-2 sm:w-[450px] md:grid-cols-2">
												<Button
													type="submit"
													variant="default"
													onClick={form.handleSubmit(onSubmit)}
													className="font-bold"
													disabled={form.formState.isSubmitting}
												>
													公開する
												</Button>
												<DialogClose asChild>
													<Button
														type="button"
														variant="outline"
														onClick={() => console.log("キャンセルボタンが押されました")}
														className="border-2 border-black border-solid font-bold"
													>
														キャンセル
													</Button>
												</DialogClose>
											</div>
										</DialogContent>
									</Dialog>

									<Button
										type="button"
										variant="outline"
										onClick={backToNew}
										className="border-2 border-black border-solid py-[22px] font-bold text-xl"
									>
										戻る
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
