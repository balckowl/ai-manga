import Manga from './manga'
import { FaRegTrashAlt } from "react-icons/fa";

type Coma = {
	text: string;
	imageUrl: string;
};


type Props = {
    comaList: Coma[];
}

export default function GalleryManga({comaList}: Props) {
    return (
        <article>
            <Manga title="こんにちは" comaList={comaList} />
            <div className='flex justify-between'>
                <time dateTime='2022-11-07'>2022/11/07</time>
                <FaRegTrashAlt className="transition-colors duration-200 hover:text-red-400" />
            </div>
        </article>
    )
}