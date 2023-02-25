import { Client, CommandArgs } from "./shared";

import { getLogger } from "../logger";
import { getShazamSong } from "../apiCommands/shazamSong";
import { SeasideEmotes } from "../emotes/seaside";

interface Manifest {
	allowCache: boolean;
	endList: boolean;
	mediaSequence: number;
	discontinuitySequence: number;
	playlistType: string;
	custom: {};
	playlists: [
		{
			attributes: {};
			Manifest: Manifest;
		}
	];
	mediaGroups: {
		AUDIO: {
			"GROUP-ID": {
				NAME: {
					default: boolean;
					autoselect: boolean;
					language: string;
					uri: string;
					instreamId: string;
					characteristics: string;
					forced: boolean;
				};
			};
		};
		VIDEO: {};
		"CLOSED-CAPTIONS": {};
		SUBTITLES: {};
	};
	dateTimeString: string;
	dateTimeObject: Date;
	targetDuration: number;
	totalDuration: number;
	discontinuityStarts: [number];
	segments: [
		{
			byterange: {
				length: number;
				offset: number;
			};
			duration: number;
			attributes: {};
			discontinuity: number;
			uri: string;
			timeline: number;
			key: {
				method: string;
				uri: string;
				iv: string;
			};
			map: {
				uri: string;
				byterange: {
					length: number;
					offset: number;
				};
			};
			"cue-out": string;
			"cue-out-cont": string;
			"cue-in": string;
			custom: {};
		}
	];
}

let running = false;

export const songCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	if (running) return;

	// get a lock on the command
	running = true;

	const logger = getLogger();

	try {
		const channelOverride = message.split(" ")[1] || channel.slice(1);

		await client.say(
			channel,
			`Digging through my collection. One second...`
		);

		const result = await getShazamSong(channelOverride);

		// release the lock
		running = false;
		logger.log("Handling API response");

		if (!result?.track) {
			await client.say(
				channel,
				`Hmm, looks like I don't have this. Ask @SeasideFM about this one ${SeasideEmotes.Cool}`
			);
			return;
		}

		const { title, subtitle, share } = result.track;
		await client.say(
			channel,
			`I think this is ${title} by ${subtitle} | ${share.href}`
		);
	} catch (e) {
		console.error(e);
		await client.say(
			channel,
			`@Duke_Ferdinand Error reading from stream, is it live?`
		);

		// release the lock
		running = false;
	}
};
