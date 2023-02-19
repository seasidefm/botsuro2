import { Client, CommandArgs } from "./shared";
import { Buffer } from "buffer";

// @ts-ignore
import { Parser } from "m3u8-parser";

import getStreamSegmentFile from "../ffmpeg/getVideoFromManifest";
import { getLogger } from "../logger";

import ffmpeg from "fluent-ffmpeg";
import { fs } from "memfs";
import { getAuddId, getShazamSong } from "../apiCommands/shazamSong";

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

const logger = getLogger();

async function getPcmAudioFile(creator: string): Promise<Buffer> {
	logger.log(`Saving stream segment ${creator}`);
	const streamSegment = await getStreamSegmentFile(creator);

	logger.log(`Saved stream segment to ${streamSegment}`);
	const command = ffmpeg({
		source: streamSegment,
	});

	// FFMPEG using in memory file system
	const fileName = `${creator}.mp3`;
	const file = fs.createWriteStream(`/${fileName}`);
	command
		.audioCodec("pcm_s16le")
		.audioChannels(1)
		.format("wav")
		.output(file, { end: true });

	logger.log("Running ffmpeg command (this may take a while)");
	return new Promise((resolve, reject) => {
		command.run();

		command.on("error", (err) => {
			reject(err);
		});

		command.on("end", () => {
			logger.log("DONE. Getting file data from memfs");
			const data = fs.readFileSync(`/${fileName}`);

			resolve(data as Buffer);
		});
	});
}

export const songCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self, message } = args;
	if (self) return;

	const logger = getLogger();

	try {
		const channelOverride = message.split(" ")[1] || channel.slice(1);

		await client.say(
			channel,
			`identifying! this will take a few seconds...`
		);

		logger.log("Getting audio for channel: " + channelOverride);
		const data = await getPcmAudioFile(channelOverride);

		logger.log("Got audio data, sending to API for identification");
		const auddId = await getAuddId(data);
		const result = await getShazamSong(data);

		console.log(auddId);
		console.log(result);

		const m: string = auddId
			? `I think this is ${auddId.title} by ${auddId.artist} - ${auddId.song_link}`
			: result?.track
			? `I think this is ${result.track.title} by ${result.track.subtitle} - ${result.track.share.href}`
			: `sorry, I couldn't find the song :(`;

		logger.log("Handling API response");
		await client.say(channel, m);
	} catch (e) {
		console.error(e);
		await client.say(
			channel,
			`@${args.tags.username} error reading from stream, is it live?`
		);
	}
};
