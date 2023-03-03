import { Configuration, OpenAIApi } from "openai";

let aiLock = false;
export async function heyBotsuro(query: string, maxTokens: number = 250) {
	try {
		if (aiLock) {
			return;
		}

		aiLock = true;

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
					content: `${query} in less than ${maxTokens} characters`,
				},
			],
			temperature: 0.2,
			max_tokens: maxTokens,
		});

		aiLock = false;

		return response.data.choices[0].message?.content;
	} catch (error) {
		aiLock = false;
		console.error(error);
	}
}
