import { Client, CommandArgs } from "./shared";
import { setEmoteOnly } from "../apiCommands/emoteOnly";

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const danceEmotes = [
	"seasid3IsForGroove",
	"seasid3IsForRave",
	"seasid3IsForDance",
];

const getLastArgumentFromMessage = (message: string) => {
	const splitMessage = message.split(" ");
	return splitMessage[splitMessage.length - 1];
};

let dancePartyActive = false;
let dancePartyTimeout: NodeJS.Timeout;

export const dancePartyCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message, tags } = args;
	if (self) return;

	if (dancePartyActive) {
		const arg = getLastArgumentFromMessage(message);
		if (arg === "stop") {
			await setEmoteOnly(false);
			clearTimeout(dancePartyTimeout);
			dancePartyActive = false;
			await client.say(
				channel,
				`@${tags.username}, ended the dance party early!`
			);
			return;
		}

		return;
	}

	let duration = Number(getLastArgumentFromMessage(message));

	if (isNaN(duration)) {
		duration = 60;
	}

	await client.say(channel, `Hey every-ducky, it's time to DANCE 💃 🕺`);
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

	dancePartyActive = true;
	await setEmoteOnly(true);

	// step 2, dance party
	// get 5 random emotes from the dance emotes array
	const randomEmotes = [];
	for (let i = 0; i < 5; i++) {
		const randomIndex = Math.floor(Math.random() * danceEmotes.length);
		randomEmotes.push(danceEmotes[randomIndex]);
	}

	await sleep(500);
	await client.say(channel, randomEmotes.join(" "));

	dancePartyTimeout = setTimeout(async () => {
		await setEmoteOnly(false);
		await client.say(channel, `Phew, that's enough dancing for now`);
		await sleep(500);
		await client.say(
			channel,
			`Nice moves everyone! Until the next dance party! seasid3IsForLove`
		);
	}, duration * 1000);
};
