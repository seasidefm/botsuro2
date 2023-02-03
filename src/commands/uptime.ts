import { Client, CommandArgs } from "./shared";

export const matchUptimeCommand = (message: string) => {
	return message.toLowerCase().startsWith("?uptime");
}

export const uptimeCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	if (matchUptimeCommand(message)) {
		await client.say(channel, `@${args.tags.username}, the stream has been live for ???`);
	}
}