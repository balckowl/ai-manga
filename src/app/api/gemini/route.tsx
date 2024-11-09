import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

const vision = new ChatGoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
	modelName: "gemini-1.5-pro",
	maxOutputTokens: 2048,
});

export async function POST(request: Request) {
	try {
		// フロントエンドから渡される画像URLの配列をリクエストのbodyから取得
		const { images } = await request.json();

		if (!Array.isArray(images) || images.length === 0) {
			return NextResponse.json({ error: "画像URLの配列が空です。" }, { status: 400 });
		}

		const prompt =
			"次の4枚の画像について、それぞれの説明を返してください。説明は配列形式で返してください。配列のみを返してください。";
		const combinedPrompt = `${prompt}\n\n${images.join("\n")}`;

		const inputMessage = [new HumanMessage(combinedPrompt)];

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
