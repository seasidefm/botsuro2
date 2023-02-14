import tmi from "tmi.js";
import * as commands from "./commands";
import { getLogger } from "./logger";

// Emoji
const emoji = {
	success: "✅",
	error: "❌",
	info: "ℹ️",
	warning: "⚠️",
	loading: "🔄",
	bot: "🤖",
	rocket: "🚀",
};

const logger = getLogger();

const isModerator = (tags: tmi.ChatUserstate) => {
	return tags.mod || tags["user-type"] === "mod";
};

async function main() {
	logger.log(`${emoji.loading} Starting bot...`);

	// Set up the client
	const botToken = process.env.BOT_TOKEN as `oauth:${string}` | undefined;

	if (!botToken) {
		logger.error("BOT_TOKEN is not defined");
		throw new Error("BOT_TOKEN is not defined");
	}

	const channels = process.env.BOT_CHANNELS?.split(",") || [];

	if (channels.length === 0) {
		logger.error("BOT_CHANNELS is not defined or empty");
		throw new Error("BOT_CHANNELS is not defined or empty");
	}

	const client = new tmi.Client({
		identity: {
			username: "Botsuro_Yamashita",
			password: process.env.BOT_TOKEN as `oauth:${string}`,
		},
		channels: channels,
	});

	logger.log(`${emoji.success} Client set up!`);

	// Connect to Twitch:
	await client.connect();

	logger.log(`${emoji.success} Connected to Twitch!`);

	// TODO: add a handler for gift subs + anonymous subs
	// Listen for gifted subscriptions:
	// client.on("giftedsubscription", async (channel, username, streakMonths, recipient, methods, userstate) => {

	// Listen for messages:
	client.on("message", async (channel, tags, message, self) => {
		if (self) return;

		try {
			if (!message.startsWith("?")) {
				return;
			}

			// Match commands
			const command = commands.commandMatcher(message);

			switch (command) {
				case commands.Commands.Help:
					logger.log(
						`${channel} - ?help called by ${tags["display-name"]}`
					);

					await commands.helpCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.Discord:
					logger.log(
						`${channel} - ?discord called by ${tags["display-name"]}`
					);

					await commands.discordCommand(client, {
						channel,
						tags,
						message,
						self,
					});

					break;

				case commands.Commands.SubThanks:
					logger.log(
						`${channel} - sub thanks called by ${tags["display-name"]}`
					);

					await commands.subCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.BitThanks:
					logger.log(
						`${channel} - bit thanks called by ${tags["display-name"]}`
					);

					await commands.bitsCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.GiftSubThanks:
					logger.log(
						`${channel} - gift sub thanks called by ${tags["display-name"]}`
					);

					await commands.giftSubCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.DuckJoke:
					logger.log(
						`${channel} - duck joke called by ${tags["display-name"]}`
					);

					await commands.duckJokeCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.Kanpai:
					await commands.kanpaiCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				// mod only commands

				case commands.Commands.DanceParty:
					logger.log(
						`${channel} - dance party called by ${tags["display-name"]}`
					);

					if (!isModerator(tags)) {
						return;
					}

					await commands.dancePartyCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.Chill:
					logger.log(
						`${channel} - chill called by ${tags["display-name"]}`
					);

					if (!isModerator(tags)) {
						return;
					}

					await commands.chillCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.Ping:
					logger.log(
						`${channel} - ?ping called by ${tags["display-name"]}`
					);

					await commands.pingPongCommand(client, {
						channel,
						tags,
						message,
						self,
					});

					break;

				case commands.Commands.TranslationHelp:
					logger.log(
						`${channel} - ?translate called by ${tags["display-name"]}`
					);

					await commands.translationHelpCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;

				case commands.Commands.TranslateText:
					logger.log(
						`${channel} - translation command called by ${tags["display-name"]}`
					);

					await commands.translateTextCommand(client, {
						channel,
						tags,
						message,
						self,
					});
					break;
			}
		} catch (error) {
			logger.error(`${emoji.error} ${error}`);
		}
	});
}

main().catch((error) => {
	logger.error(error);
	process.exit(1);
});
