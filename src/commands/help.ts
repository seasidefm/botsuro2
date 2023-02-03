import { Client, CommandArgs } from "./shared";

export const helpMessage = `
Commands: 
?help - Displays this message |
?ping - Pong! |
?uptime - Displays the stream uptime |
?followage - Displays your follow age |
?translate - Displays the translation help message
`;

export const matchHelpCommand = (message: string) => {
	return message.toLowerCase().startsWith("?help");
};

export const helpCommand = (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	if (matchHelpCommand(args.message)) {
		client.say(channel, helpMessage);
	}
};
