import { Client, CommandArgs } from "./shared";

export const helpMessage = `
Commands: 
?help - Displays this message |
?translate - Displays the translation help message |
?danceparty - Starts a dance party (mod only)
`;

export const helpCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, helpMessage);
};
