import { Client, CommandArgs } from "./shared";

// @ts-ignore
import { Parser } from "m3u8-parser";
import getManifestFromCreator, {
	getAudioFromManifestURL,
} from "../ffmpeg/getVideoFromManifest";

interface Segment {
	dateTimeString: string; // ISO 8601
	dateTimeObject: Date;
	duration: number;
	uri: string;
	timeline: number;
}

interface Playlist {
	allowCache: boolean;
	discontinuityStarts: [];
	segments: Segment[];
	version: number;
	targetDuration: number;
	mediaSequence: number;
	dateTimeString: string; // ISO 8601
	dateTimeObject: Date;
	discontinuitySequence: number;
}

async function testStreamStuff(creator: string) {
	const manifest = await getManifestFromCreator(creator);

	console.log(manifest);

	if (!manifest) return null;

	const video = getAudioFromManifestURL(manifest.urls["audio_only"]);
}

export const songCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	const channelOverride = message.split(" ")[1] || channel.slice(1);

	await client.say(channel, `@${args.tags.username} thinking...`);

	// await testStreamStuff(channel.slice(1));
	const response = await testStreamStuff(channelOverride);

	if (!response)
		await client.say(
			channel,
			`@${args.tags.username} no response from stream, is it live?`
		);
	else await client.say(channel, `@${args.tags.username} done!`);
};
