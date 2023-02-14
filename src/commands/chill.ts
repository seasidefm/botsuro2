import { Client, CommandArgs } from "./shared";
import { NormalEmotes } from "../emotes/normal";
import { setSlowMode } from "../apiCommands/slowmode";
import { SeasideEmotes } from "../emotes/seaside";

const ChillageMessage = `Maximum chillage achieved. Slow mode over! ${SeasideEmotes.Cool}`;

let chillTimeout: NodeJS.Timeout;
export const chillCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	if (chillTimeout) {
		clearTimeout(chillTimeout);
		await setSlowMode(false);
		await client.say(channel, ChillageMessage);

		return;
	}

	const chillDuration = Number(message.split(" ")[1] || 1);

	await client.say(
		channel,
		`Everyone take a break and chill out! ${NormalEmotes.turtle} ${NormalEmotes.clock}`
	);

	await setSlowMode(true);

	chillTimeout = setTimeout(async () => {
		await setSlowMode(false);
		await client.say(channel, ChillageMessage);
	}, chillDuration * 1000 * 60);
};
