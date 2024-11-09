'use client';

import Manga from '@/components/manga';
import { useForm, type SubmitHandler, type ControllerRenderProps} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import { Form, FormControl, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';


const mangaFormSchema = z.object({
    title: z.string().min(1, { message: "タイトルを入力してください" }),
    firstComa: z.string().min(1, { message: "文章を入力してください" }),
    secondComa: z.string().min(1, { message: "文章を入力してください" }),
    thirdComa: z.string().min(1, { message: "文章を入力してください" }),
    fourthComa: z.string().min(1, { message: "文章を入力してください" }),
})

type MangaFormSchemaType = z.infer<typeof mangaFormSchema>;

type Props = {
    onEditCompleted: () => void;
}

export default function PostEdit({ onEditCompleted }: Props) {

    const [title, setTitle] = useState('lorem');
    const [firstComa, setFirstComa] = useState('lorem');
    const [secondComa, setSecondComa] = useState('lorem');
    const [thirdComa, setThirdComa] = useState('lorem');
    const [fourthComa, setFourthComa] = useState('lorem');

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
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<MangaFormSchemaType> = (data) => {
        console.log('フォームの内容が送信されました：', data);
        setIsOpen(false);
        onEditCompleted();
    }

    return (
        <div className="mx-auto max-w-[800px]">
            <div className="mx-auto w-[95%]">
                <div className="text-center">
                    <h2 className='mt-8 font-bold text-2xl md:text-4xl' style={{wordBreak: "keep-all"}}>文章を修正して<wbr />もっとおもしろくしよう！</h2>
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
                                render={({ field }: { field: ControllerRenderProps<MangaFormSchemaType, "title"> }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title">タイトル</FormLabel>
                                        {form.formState.errors.title && <p className='text-red-500'>{form.formState.errors.title.message}</p>}
                                        <FormControl>
                                            <Input {...field} id="title" className='border-2 border-black border-solid p-5' onChange={(e) => {
                                                field.onChange(e);
                                                setTitle(e.target.value);
                                            }} placeholder='タイトルを入力' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-4'>
                            <FormField
                                control={form.control}
                                name="firstComa"
                                render={({ field }: { field: ControllerRenderProps<MangaFormSchemaType, "firstComa"> }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="firstComa">1コマ目</FormLabel>
                                        {form.formState.errors.firstComa && <p className='text-red-500'>{form.formState.errors.firstComa.message}</p>}
                                        <FormControl>
                                            <Textarea {...field} id="firstComa" className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3" onChange={(e) => {
                                                field.onChange(e);
                                                setFirstComa(e.target.value);
                                            }} placeholder='文章を入力' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-4'>
                            <FormField
                                control={form.control}
                                name="secondComa"
                                render={({ field }: { field: ControllerRenderProps<MangaFormSchemaType, "secondComa"> }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="secondComa">2コマ目</FormLabel>
                                        {form.formState.errors.secondComa && <p className='text-red-500'>{form.formState.errors.secondComa.message}</p>}
                                        <FormControl>
                                            <Textarea {...field} id="secondComa" className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3" onChange={(e) => {
                                                field.onChange(e);
                                                setSecondComa(e.target.value);
                                            }} placeholder='文章を入力' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-4'>
                            <FormField
                                control={form.control}
                                name="thirdComa"
                                render={({ field }: { field: ControllerRenderProps<MangaFormSchemaType, "thirdComa"> }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="thirdComa">3コマ目</FormLabel>
                                        {form.formState.errors.thirdComa && <p className='text-red-500'>{form.formState.errors.thirdComa.message}</p>}
                                        <FormControl>
                                            <Textarea {...field} id="thirdComa" className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3" onChange={(e) => {
                                                field.onChange(e);
                                                setThirdComa(e.target.value);
                                            }} placeholder='文章を入力' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-4'>
                            <FormField
                                control={form.control}
                                name="fourthComa"
                                render={({ field }: { field: ControllerRenderProps<MangaFormSchemaType, "fourthComa"> }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fourthComa">4コマ目</FormLabel>
                                        {form.formState.errors.fourthComa && <p className='text-red-500'>{form.formState.errors.fourthComa.message}</p>}
                                        <FormControl>
                                            <Textarea {...field} id="fourthComa" className="min-h-[80px] w-full resize-none border-2 border-black border-solid p-3" onChange={(e) => {
                                                field.onChange(e);
                                                setFourthComa(e.target.value);
                                            }} placeholder='文章を入力' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <div className="text-center">
                                <h3 className='mt-10 font-bold text-2xl md:text-4xl'>最終確認をしよう！</h3>
                                <p>これを公開してもいいかな？</p>
                            </div>

                            <div className="mx-auto mt-4 max-w-[500px]">
                                <Manga title={title} contents={[
                                    { text: firstComa, img: "https://picsum.photos/id/222/300/200" },
                                    { text: secondComa, img: "https://picsum.photos/id/122/300/200" },
                                    { text: thirdComa, img: "https://picsum.photos/id/124/300/200" },
                                    { text: fourthComa, img: "https://picsum.photos/id/152/300/200" },
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
                                        disabled={!form.formState.isValid}
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
                                        </DialogDescription>
                                        
                                        <MdOutlineFileUpload className="mx-auto my-[20px] text-9xl text-black md:my-[35px]" />

                                        <div className="relative rounded-md bg-gray-300 p-4 text-center">
                                            <p>公開される情報</p>
                                            <ul>
                                                <li className='mt-2'>・アカウントの表示名</li>
                                            </ul>
                                        </div>
                                                
                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                            <Button
                                                type="submit"
                                                variant="default"
                                                onClick={form.handleSubmit(onSubmit)}
                                                className="mt-5 font-bold"
                                                disabled={form.formState.isSubmitting}
                                                >公開する
                                            </Button>
                                            <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => console.log("キャンセルボタンが押されました")}
                                                className="border-2 border-black border-solid font-bold md:mt-5"
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
                </Form>
            </div>
        </div>
    )
}