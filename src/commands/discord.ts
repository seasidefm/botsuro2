import { Client, CommandArgs } from "./shared";
import { SeasideEmotes } from "../emotes/seaside";
export const discordCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(
		channel,
		`Hey every-ducky! Join us on discord to hang out with the duck fam after the stream: https://discord.gg/seasidefm ${SeasideEmotes.Cool}`
	);
};
