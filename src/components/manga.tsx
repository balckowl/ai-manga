"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
	title: string;
	comaList: Coma[];
};

type Coma = {
	text: string;
	imageUrl: string;
};

export default function Manga({ title, comaList }: Props) {
	return (
		<div className="">
			<h2 className="mb-[13px] bg-black py-[6px] text-center font-bold text-white">{title}</h2>
			<Swiper
				style={
					{
						"--swiper-pagination-color": "#000",
					} as CSSProperties
				}
				pagination={{
					clickable: true,
				}}
				centeredSlides={true}
				loop={true}
				navigation={{
					nextEl: ".swiper_button_next",
					prevEl: ".swiper_button_prev",
					hideOnClick: true,
				}}
				modules={[Navigation, Autoplay, Pagination]}
				spaceBetween={50}
				slidesPerView={1}
				className="relative border-[3px] border-black"
			>
				{comaList.map((coma) => (
					<SwiperSlide key={coma.imageUrl} className="h-[400px]">
						<Image src={coma.imageUrl} width={500} height={400} alt="w-full" />
						<div className="absolute top-0 right-0 z-[10] flex h-[220px] w-[90px] items-center justify-center border-black border-b-[3px] border-l-[3px] bg-white p-2 [writing-mode:vertical-rl]">
							{coma.text}
						</div>
					</SwiperSlide>
				))}
				<div className="absolute bottom-0 z-[100] flex w-full items-center justify-between p-2">
					<div className="swiper_button_prev flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full bg-black text-white">
						<FaArrowLeft size={10} />
					</div>

					<div className="swiper_button_next flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full bg-black text-white">
						<FaArrowRight size={10} />
					</div>
				</div>
			</Swiper>
		</div>
	);
}
