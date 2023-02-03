import { Client, CommandArgs } from "./shared";
import { getLogger } from "../logger";

export const translateHelpMessage = `
Translation Commands:
?ja - to Japanese |
?pt - to Portuguese |
?fr - to French | 
?en - to English |
?de - to German |
?it - to Italian |
?es - to Spanish
`;

const translatePrefixes = [
	"?ja",
	"?pt",
	"?fr",
	"?en",
	"?de",
	"?it",
	"?es",
]

const logger = getLogger()

export const translationHelpCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, translateHelpMessage);
};


const getTranslationPrefix = (message: string) => {
	return translatePrefixes.find((prefix) => message.startsWith(prefix));
}

const getMessageWithoutPrefix = (message: string) => {
	const prefix = getTranslationPrefix(message);
	return message.replace(prefix + " ", "");
}

const getDeeplTranslation = async (prefix: string, message: string) => {
	try {
		const deeplUrl = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.DEEPL_KEY}&text=${message}&target_lang=${prefix.replace("?", "")}`;
		const deeplResponse = await fetch(deeplUrl);
		const deeplJson = await deeplResponse.json();
		return deeplJson.translations[0].text;
	} catch (error) {
		logger.error(`Error translating: ${error}`);
		return  null
	}

}

export const matchTranslationCommand = (message: string) => {
	return translatePrefixes.find((prefix) => message.startsWith(prefix));
}

export const translateTextCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;

	if (self) return;

	try {
		const prefix = getTranslationPrefix(args.message);
		const message = getMessageWithoutPrefix(args.message);

		logger.log(`Translating: ${message} to ${prefix}`);

		const translation = await getDeeplTranslation(prefix!.replace("?", ""), message);

		logger.log(`Translating: ${message} to ${prefix}`);

		await client.say(channel, `@${args.tags.username} says: ${translation}`)
	} catch (error) {
		await client.say(channel, `@${args.tags.username} sorry! Got an error translating your message.`)
	}
}
