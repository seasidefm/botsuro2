import { Client, CommandArgs } from "./shared";

export const matchPingPongCommand = (message: string) => {
	return message.toLowerCase().startsWith("?ping");
}

export const pingPongCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(channel, `@${args.tags.username} pong!`);
}