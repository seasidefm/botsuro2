import { Client, CommandArgs } from "../commands/shared";
import { SeasideEmotes } from "../emotes/seaside";

const djList = [
	// "SeasideFM", "MC_Clancy",
	"Duke_Ferdinand",
];

export async function djGreet(args: CommandArgs): Promise<boolean> {
	const { self } = args;
	if (self) return false;

	// get the user's name
	const name = args.tags["display-name"];

	// check if the user is a DJ
	return djList.includes(name);
}

export async function handleDjMatch(
	client: Client,
	dj: string,
	args: CommandArgs
) {
	const { channel, self } = args;
	if (self) return;
	// send the message
	await client.say(
		channel,
		`A big warm shoutout to @{channel} - follow them at twitch.tv/{channel} for more amazing music! ${SeasideEmotes.Love}`.replaceAll(
			"{channel}",
			dj
		)
	);
}
