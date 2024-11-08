"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";

export default function Page() {
	const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);

	const handleImageChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const newImages = [...images];
			newImages[index] = URL.createObjectURL(file);
			setImages(newImages);
		}
	};

	return (
		<div className="flex h-[calc(100vh-200px)] items-center">
			<div className="container mx-auto">
				<div className="mb-[30px] text-center">
					<h2 className="mb-[2px] font-bold text-[35px]">マンガに使う画像を4枚決めよう</h2>
					<p className="text-[14px]">
						選択した画像の順番のままマンガを作るから、えらぶ順番に注意してね
					</p>
				</div>

				<div className="mx-auto mb-[30px] flex w-[820px] flex-wrap gap-4">
					{images.map((image, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className="relative flex h-[240px] w-[400px] items-center justify-center overflow-hidden border-[3px] border-black"
						>
							{image ? (
								<Image
									src={image}
									alt={`Selected ${index + 1}`}
									width={400}
									height={240}
									objectFit="cover"
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
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleImageChange(index, e)}
								className="absolute inset-0 cursor-pointer opacity-0"
							/>
							<p className="absolute right-5 bottom-3 font-bold">{index + 1}</p>
						</div>
					))}
				</div>

				<div className="flex justify-center gap-4">
					<Button className="w-[200px] font-bold">生成する</Button>
					<Button className="w-[200px] font-bold" variant="secondary">
						キャンセル
					</Button>
				</div>
			</div>
		</div>
	);
}
