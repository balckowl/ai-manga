'use client';

import Manga from '@/components/manga';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { MdOutlineFileUpload } from "react-icons/md";


const mangaFormSchema = z.object({
    title: z.string().min(1, { message: "タイトルを入力してください" }),
    firstComa: z.string().min(1, { message: "文章を入力してください" }),
    secondComa: z.string().min(1, { message: "文章を入力してください" }),
    thirdComa: z.string().min(1, { message: "文章を入力してください" }),
    fourthComa: z.string().min(1, { message: "文章を入力してください" }),
})

type MangaFormSchemaType = z.infer<typeof mangaFormSchema>;

export default function Page() {

    const formRef = useRef(null);
    
    const [title, setTitle] = useState('ポラーノの広場');
    const [firstComa, setFirstComa] = useState('あのイーハトーヴォのすきとおった風、夏でも底に冷たさ');
    const [secondComa, setSecondComa] = useState('あのイーハトーヴォのすきとおった風、夏でも底に冷たさ');
    const [thirdComa, setThirdComa] = useState('あのイーハトーヴォのすきとおった風、夏でも底に冷たさ');
    const [fourthComa, setFourthComa] = useState('あのイーハトーヴォのすきとおった風、夏でも底に冷たさ');

    const [isDialogOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<MangaFormSchemaType>({
        defaultValues: {
            title,
            firstComa,
            secondComa,
            thirdComa,
            fourthComa,
        },
        resolver: zodResolver(mangaFormSchema),
    });

    const onSubmit: SubmitHandler<MangaFormSchemaType> = (data) => {
        console.log('フォームの内容が送信されました：', data);
        setIsOpen(false);
    }

    // モーダルからsubmitするための関数
    const customSubmit = () => handleSubmit(onSubmit)();

    return (
        <div className="mx-auto max-w-[800px]">
            <div className="mx-auto w-[95%]">
                <div className="text-center">
                    <h2 className='mt-8 font-bold text-2xl md:text-4xl' style={{wordBreak: "keep-all"}}>文章を修正して<wbr />もっとおもしろくしよう！</h2>
                    <p className="mt-2 md:mt-4">
                        タイトルとマンガのなかの文字を変更できるよ
                        <br />
                        個人情報などは含めないように注意してね。
                    </p>
                </div>

                <form ref={formRef} className="mx-auto mt-2 w-[90%]" onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor='title'>タイトル</label>
                        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        <div className="mt-2">
                            <input className="w-full rounded-xl border-2 border-black border-solid p-3" type="text" id="title" {...register("title", {onChange: (e) => setTitle(e.target.value)})} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='firstComa'>1コマ目</label>
                        {errors.firstComa && <p className='text-red-500'>{errors.firstComa.message}</p>}
                        <div className="mt-2">
                            <textarea className="min-h-[80px] w-full resize-none rounded-xl border-2 border-black border-solid p-3" id="firstComa" {...register("firstComa", {onChange: (e) => setFirstComa(e.target.value)})} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='secondComa'>2コマ目</label>
                        {errors.secondComa && <p className='text-red-500'>{errors.secondComa.message}</p>}
                        <div className="mt-2">
                            <textarea className="min-h-[80px] w-full resize-none rounded-xl border-2 border-black border-solid p-3" id="secondComa" {...register("secondComa", {onChange: (e) => setSecondComa(e.target.value)})} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='thirdComa'>3コマ目</label>
                        {errors.thirdComa && <p className='text-red-500'>{errors.thirdComa.message}</p>}
                        <div className="mt-2">
                            <textarea className="min-h-[80px] w-full resize-none rounded-xl border-2 border-black border-solid p-3" id="thirdComa" {...register("thirdComa", {onChange: (e) => setThirdComa(e.target.value)})} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='fourthComa'>4コマ目</label>
                        {errors.fourthComa && <p className='text-red-500'>{errors.fourthComa.message}</p>}
                        <div className="mt-2">
                            <textarea className="min-h-[80px] w-full resize-none rounded-xl border-2 border-black border-solid p-3" id="fourthComa" {...register("fourthComa", {onChange: (e) => setFourthComa(e.target.value)})} />
                        </div>
                    </div>


                    <div>
                        <div className="text-center">
                            <h3 className='mt-10 font-bold text-2xl md:text-4xl'>最終確認をしよう！</h3>
                            <p>これを公開してもいいかな？</p>
                        </div>

                        <div className="mx-auto mt-4 max-w-[500px]">
                            <Manga title={title} comaList={[
                                { text: firstComa, imageUrl: "https://picsum.photos/id/222/300/200" },
                                { text: secondComa, imageUrl: "https://picsum.photos/id/122/300/200" },
                                { text: thirdComa, imageUrl: "https://picsum.photos/id/124/300/200" },
                                { text: fourthComa, imageUrl: "https://picsum.photos/id/152/300/200" },
                            ]} />
                        </div>
                    </div>

                    <div className="my-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

                        <Dialog open={isDialogOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="default"
                                    onClick={() => console.log("削除するボタンが押されました")}
                                    className="font-bold"
                                    disabled={!isValid}
                                    >公開する
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="w-[90%] max-w-[700px] rounded-md">
                                <DialogHeader>
                                    <DialogTitle className="mx-auto mb-10 text-center">作品の公開</DialogTitle>
                                    <DialogDescription className='text-center text-black text-md'>
                                            作品を公開するよ
                                            <br />
                                            公開した作品は編集できないから注意してね！
                                            <MdOutlineFileUpload className="mx-auto my-[20px] text-9xl text-black md:my-[35px]" />
                                    </DialogDescription>

                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                        <Button
                                            type="submit"
                                            variant="default"
                                            onClick={customSubmit}
                                            className="font-bold"
                                            disabled={isSubmitting}
                                            >公開する
                                        </Button>
                                        <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => console.log("キャンセルボタンが押されました")}
                                            className="border-2 border-black border-solid font-bold"
                                            >キャンセル
                                        </Button>
                                        </DialogClose>
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => console.log("戻るボタンが押されました")}
                            className="border-2 border-black border-solid font-bold"
                            >戻る
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}