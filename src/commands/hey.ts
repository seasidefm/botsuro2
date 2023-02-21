import { Client, CommandArgs } from "./shared";
import { SeasideEmotes } from "../emotes/seaside";
import { findUsernames } from "../utils/findUsernames";

export const heyCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	const usernames = findUsernames(message);

	if (!usernames) {
		await client.say(
			channel,
			`Hey hey heyyyy ${args.tags.username}, you're ride on time! ${SeasideEmotes.RideOnTime}`
		);
		return;
	}

	await client.say(
		channel,
		`Hey hey heyyyy ${usernames.join(", ")}, you're ride on time! ${
			SeasideEmotes.RideOnTime
		}`
	);
};
