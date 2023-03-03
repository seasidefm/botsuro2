import { Configuration, OpenAIApi } from "openai";

export async function heyBotsuro(query: string, maxTokens: number = 500) {
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const model = "gpt-3.5-turbo";
	const response = await openai.createChatCompletion({
		model: model,
		messages: [
			{
				role: "user",
				content: query,
			},
		],
		temperature: 0.2,
		max_tokens: maxTokens,
	});

	return response.data.choices[0].message?.content;
}
