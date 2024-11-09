import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

const vision = new ChatGoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
	modelName: "gemini-1.5-flash",
	maxOutputTokens: 2048,
});

async function fetchImageAsBase64(url: string): Promise<string> {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();
	return Buffer.from(buffer).toString("base64");
}

export async function POST(request: Request) {
	try {
		const { images } = await request.json();

		if (!Array.isArray(images) || images.length === 0) {
			return NextResponse.json({ error: "画像URLの配列が空です。" }, { status: 400 });
		}

		// 各画像URLをBase64に変換
		const base64Images = await Promise.all(images.map(fetchImageAsBase64));

		// Gemini APIに送信するメッセージを構築
		const inputMessage = [
			new HumanMessage({
				content: [
					{
						type: "text",
						text: `あなたは漫画家です。次の4枚の画像について、起承転結のストーリーを作り、画像一枚につき20字以内で返してください。説明は配列形式で返してください。配列のみを返してください。
						#記入例「先生・・・よし子は無事なんですか！,レントゲン撮影の結果なんですが…・・はい…・・,えっ・・・指輪？レントゲン撮影の結果なんですが…・・はい…・・指輪がなんで…,驚いた？僕と結婚しよう」
						`,
					},
					...base64Images.map((image) => ({
						type: "image_url",
						image_url: `data:image/png;base64,${image}`,
					})),
				],
			}),
		];

		const response = await vision.invoke(inputMessage);

		// `content`をJSONパースして配列として取得
		let descriptions: string[];
		if (typeof response.content === "string") {
			try {
				descriptions = JSON.parse(response.content);
			} catch (_e) {
				descriptions = [response.content];
			}
		} else {
			descriptions = ["応答が予期された形式ではありません。"];
		}

		// descriptions配列と画像URLをcontents形式に変換
		const contents = descriptions.map((text: string, index: number) => ({
			text,
			img: images[index] || "", // フロントエンドから渡された画像URLを使用
		}));

		return NextResponse.json({ contents });
	} catch (error) {
		console.error("Error generating response:", error);
		return NextResponse.json({ error: "応答の生成に失敗しました。" }, { status: 500 });
	}
}
