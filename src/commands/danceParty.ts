import { Client, CommandArgs } from "./shared";
import { setEmoteOnly } from "../apiCommands/emoteOnly";

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const getLastArgumentFromMessage = (message: string) => {
	const splitMessage = message.split(" ");
	return splitMessage[splitMessage.length - 1];
};

export const dancePartyCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	let duration = Number(getLastArgumentFromMessage(message));

	if (isNaN(duration)) {
		duration = 60;
	}

	await client.say(channel, `Hey every-ducky, it's time to DANCE`);
	await sleep(1000);

	await client.say(
		channel,
		`Bust out those dance emotes and show us what you've got!`
	);

	await sleep(1000);

	// step 1, cowboy bebop style message
	await client.say(channel, `3`);
	await sleep(500);
	await client.say(channel, `2`);
	await sleep(500);
	await client.say(channel, `1`);
	await sleep(500);
	await client.say(channel, `LET'S JAM!`);
	await setEmoteOnly(true);

	setTimeout(async () => {
		await client.say(channel, `Alright, that's enough dancing for now`);
		await client.say(channel, `Nice moves everyone! See you next time!`);
		await setEmoteOnly(false);
	}, duration * 1000);
};
