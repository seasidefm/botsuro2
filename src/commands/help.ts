import { Client, CommandArgs } from "./shared";

export const helpMessage = `
Commands: 
?help - displays this message |
?translate - show the translation help message |
?duckjoke - get a great duck joke |
?kanpai - cheers!
`;

export const helpCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, helpMessage);
};
