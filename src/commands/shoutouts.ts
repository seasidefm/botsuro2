import { Client, CommandArgs } from "./shared";
import { findUsernames } from "../utils/findUsernames";
import { saveShoutout, StreamerType } from "../db/saveShoutout";

export const soCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	const usernames = findUsernames(message);

	const outMessage =
		"Whoa - @{channel} is totally awesome! They might not play music but drop them a follow for some super awesome streams 😎 https://twitch.tv/{channel}";

	if (!usernames) {
		const arg = message.split(" ").filter((arg) => !arg.startsWith("?"))[0];

		const name = arg ? arg.replace("@", "") : args.tags.username;

		await client.say(channel, outMessage.replaceAll("{channel}", name));
		return;
	}

	await client.say(
		channel,
		outMessage.replaceAll("{channel}", usernames[0].replace("@", ""))
	);

	for (const username of usernames) {
		await saveShoutout(username.replace("@", ""), StreamerType.NON_DJ);
	}
};

export const djCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	// get first non-command in message
	const usernames = findUsernames(message);

	const outMessage =
		"A big warm shoutout to @{channel} - follow them at twitch.tv/{channel} for more amazing music!";

	if (!usernames) {
		const arg = message.split(" ").filter((arg) => !arg.startsWith("?"))[0];

		const name = arg ? arg.replace("@", "") : args.tags.username;
		await client.say(channel, outMessage.replaceAll("{channel}", name));

		return;
	}

	await client.say(
		channel,
		outMessage.replaceAll("{channel}", usernames[0].replace("@", ""))
	);

	for (const username of usernames) {
		await saveShoutout(username.replace("@", ""), StreamerType.DJ);
	}
};
