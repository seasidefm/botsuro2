import { Client, CommandArgs } from "./shared";
import { SeasideEmotes } from "../emotes/seaside";
import { findUsernames } from "../utils/findUsernames";

export const resubCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	const usernames = findUsernames(message);

	if (!usernames) {
		await client.say(
			channel,
			`What a lucky duck, thank you for that resub! ${SeasideEmotes.Love}`
		);
		return;
	}

	await client.say(
		channel,
		`What a lucky duck, ${usernames!.join(", ")} just resubbed! ${
			SeasideEmotes.Love
		}`
	);
};
