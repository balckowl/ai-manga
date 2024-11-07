import Manga from './manga'

type Coma = {
	text: string;
	imageUrl: string;
};


type Props = {
    comaList: Coma[];
}

export default function TopManga({comaList}: Props) {
    return (
        <article>
            <Manga title="こんにちは" comaList={comaList} />
            <p className="text-3 text-[#808080]">宮沢賢治先生yo・2022/11/07</p>
        </article>
    )
}