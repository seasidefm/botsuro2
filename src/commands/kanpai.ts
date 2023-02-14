import { Client, CommandArgs } from "./shared";

export const kanpaiCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(
		channel,
		`@${args.tags.username} raises a toast! Everyone let's drink a Fluffy Duck mocktail! 🥂`
	);
};
