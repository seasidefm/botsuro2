import tmi from "tmi.js";
import * as commands from "./commands";
import { getLogger } from "./logger";

import { config } from "dotenv";

config();

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

// https://video-weaver.sea02.hls.ttvnw.net/v1/playlist/Cv4FmnkOKS22KquU7VS0-wY5w4qi37w_cTfFCgNkkWr6LHK6z6TgjJai2CObp9b9xDEcbxMEtO3S850_O_AKaKd5EoV0bHmJb06OfflvNH-AuRl7Q7K3c4U1cUX_MVSmXhFX-che3gF35P-RWUP47UrWM_VrQBZNb6fDC2s-1hnRyZeKnRhGQxIHVL8EsJhF9Db8LhE3QXDKdDCLclTCaZqO4cvP3dUtiphp157-sNwwPFoHFd78PrLZysctnb0PLrhMKEnkCfbOxHhBomsKFDmT8jsBeRRGtxzTRgtJX1o5jSybDUcU6sPiekQLypa2scfJI1qBvTbBZKurG3VO-GIwSOoUcLKxq8yw2S8v5p176lLCM7MV6pWXO9xL9YWM35U1qX36Q0u5FHKiFEAYp954GxFTSGzlmOAy0JLiGik6yI7c2hjFuF9GCU9Edm2XRsEJvu905hLxgNxxF3zoB76n3y_3Amhh6Tw4f7aGA6FphodSWNJO6-ZDHTkRHVol4pbRe-Kcis26vwDJ2SheD_nch-HuOqR5MvpT-qP70Oruq9eFQrWYJa60w_7aUTkPeTU4R5LgzkPobiJ2wJByzD6RHCZr0JP2b9FXPsx_VbTT4PPROL0_ZL3E0WxvIu21mxgkx9nYsUCZrl1_JTM80DX21tEHHZ6MFFsYZ9xtC88mJkC4LnB9ibhqhIezmTg6AS-eum5rYsoLAQI86ljMksvYyi9G-cvd1TRK6rR9qV8KziUk2qZauuQUISDfhVMLOOiBd3sLfRJDj8wpwGiejz8iVsg0CAML7oV2aBPjYyVnuAouhlhMoXS_48rFRUJ-PVA77IXkDnOFDIHD3Silk5Tfc_05Gv3x4FuB26I_Y2PPmkMgsxca5_kXsfjc5LCbTUfEvbQqltA0t8m7fBL4y4p9oYbBdEORX0mUfcrlw-pZ6e5wzFZRlyu0pw-XGT5-iHoAIh0aeLu7IU6CMHCq-3k_A614oIB75KQBrR_O1ke8g21pStq1L4_5kc60zBkK5RoMGPLeY7BD9QcAFf_sIAEqCXVzLXdlc3QtMjDzBQ.m3u8

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

				case commands.Commands.Hey:
					logger.log(
						`${channel} - ?hey called by ${tags["display-name"]}`
					);

					await commands.heyCommand(client, {
						channel,
						tags,
						message,
						self,
					});

					break;

				// auto generated stuff
				case commands.Commands.Song:
					logger.log(
						`${channel} - ?song called by ${tags["display-name"]}`
					);

					await commands.songCommand(client, {
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

				case commands.Commands.ModSquad:
					logger.log(
						`${channel} - ?modsquad called by ${tags["display-name"]}`
					);

					if (!isModerator(tags)) {
						return;
					}

					await commands.modSquad(client, {
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
