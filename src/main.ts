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

	// Listen for messages:
	client.on(
		"message",
		async (channel, tags, message, self) => {
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

						await commands.helpCommand(client, { channel, tags, message, self });
						break;

					case commands.Commands.SubThanks:
						logger.log(
							`${channel} - sub thanks called by ${tags["display-name"]}`
						);

						await commands.subCommand(client, { channel, tags, message, self });
						break;

					case commands.Commands.BitThanks:
						logger.log(
							`${channel} - bit thanks called by ${tags["display-name"]}`
						);

						await commands.bitsCommand(client, { channel, tags, message, self });
						break;

					case commands.Commands.Ping:
						logger.log(
							`${channel} - ?ping called by ${tags["display-name"]}`
						);

						await commands.pingPongCommand(client, { channel, tags, message, self });

						break;

					case commands.Commands.TranslationHelp:
						logger.log(
							`${channel} - ?translate called by ${tags["display-name"]}`
						);

						await commands.translationHelpCommand(client, { channel, tags, message, self });
						break;
					case commands.Commands.TranslateText:
						logger.log(
							`${channel} - translation command called by ${tags["display-name"]}`
						);

						await commands.translateTextCommand(client, { channel, tags, message, self });
						break;
				}
			}catch (error) {
				logger.error(`${emoji.error} ${error}`);
			}
		}
	);
}


main()
	.then(() => logger.log("Shutdown gracefully!"))
	.catch((error) => {
		logger.error(error);
		process.exit(1);
	})


