import { Client, CommandArgs } from "./shared";
import { SeasideEmotes } from "../emotes/seaside";
import { findUsernames } from "../utils/findUsernames";

const getUsernamesAndOutMessage = (message: string) => {
	const prefix = message.split(" ")[0];
	const outMessage = message.replace(prefix, "");

	return {
		usernames: findUsernames(outMessage),
		outMessage,
	};
};

export const subCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;

	if (self) return;

	const { usernames, outMessage } = getUsernamesAndOutMessage(message);

	if (!usernames) {
		await client.say(
			channel,
			`Thank you for that sub - you're the bees knees! ${SeasideEmotes.Cool}`
		);
		return;
	}

	if (usernames.length > 1) {
		await client.say(
			channel,
			`${outMessage} thank you for those subs - you're the bees knees! ${SeasideEmotes.Cool}`
		);
	} else {
		await client.say(
			channel,
			`${outMessage} thank you for that sub - you're the bees knees! ${SeasideEmotes.Cool}`
		);
	}
};

export const giftSubCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;

	if (self) return;

	const { usernames } = getUsernamesAndOutMessage(message);

	if (!usernames) {
		await client.say(
			channel,
			`Thank you for that gift sub/those gift subs - you're the duck's beak! ${SeasideEmotes.Love} ${SeasideEmotes.Cool}`
		);
		return;
	}

	await client.say(
		channel,
		`${usernames} Thank you for that gift sub/those gift subs - you're the duck's beak! ${SeasideEmotes.Love} ${SeasideEmotes.Cool}`
	);
};

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

export const bitsCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;

	if (self) return;

	const { usernames, outMessage } = getUsernamesAndOutMessage(message);

	if (!usernames) {
		await client.say(
			channel,
			`thank you for those bits ${SeasideEmotes.Love} - you put a sparkle in my heart ?????????`
		);
		return;
	}

	await client.say(
		channel,
		`thank you for those bits ${outMessage} ${SeasideEmotes.Love} - you put a sparkle in my heart ?????????`
	);
};
