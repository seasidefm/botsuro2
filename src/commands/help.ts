import { Client, CommandArgs } from "./shared";

export const helpMessage = `
Commands: 
?help - Displays this message |
?ping - Pong! |
?uptime - Displays the stream uptime |
?followage - Displays your follow age |
?translate - Displays the translation help message
`;

export const helpCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, helpMessage);
};
