import { Client, CommandArgs } from "./shared";

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

export const translationHelpCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, translateHelpMessage);
};

export const matchTranslationCommand = (message: string) => {
	return translatePrefixes.find((prefix) => message.startsWith(prefix));
}

export const translateTextCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;

	if (self) return;

	await client.say(channel, translateHelpMessage);
}
