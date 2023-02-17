import { Client, CommandArgs } from "./shared";
import { Buffer } from "buffer";

// @ts-ignore
import { Parser } from "m3u8-parser";

import manifestUrlFromCreatorName from "../ffmpeg/getVideoFromManifest";
import { getLogger } from "../logger";

import ffmpeg from "fluent-ffmpeg";
import { fs } from "memfs";
import realFs from "fs";

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
	const fileName = `${creator}.mp3`;

	logger.log(`Getting manifest for ${creator}`);
	const manifestUrl = await manifestUrlFromCreatorName(creator);

	if (!manifestUrl) throw new Error("No manifest URL found");

	logger.log(`Got manifest URL`);

	const command = ffmpeg({
		source: manifestUrl,
	});

	const file = fs.createWriteStream(`/${fileName}`);
	command
		.setDuration(4)
		// .audioCodec("pcm_s16le")
		// .addOption("-ac", "1")
		// .audioFrequency(48000)
		// .format("wav")
		.format("mp3")
		.pipe(file, { end: true });

	logger.log("Running ffmpeg command (this may take a while)");
	return new Promise((resolve, reject) => {
		command.run();

		command.on("error", (err) => {
			reject(err);
		});

		command.on("end", () => {
			logger.log("DONE. Getting file data from memfs");
			const data = fs.readFileSync(`/${fileName}`);

			// TODO: Remove this when debugging is done
			realFs.writeFileSync(fileName, data);

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
			`@${args.tags.username} thinking! this will take a few seconds...`
		);

		logger.log("Getting audio for channel: " + channelOverride);
		const data = await getPcmAudioFile(channelOverride);

		logger.log("Got audio data, sending to API for identification");
		// ... add here

		await client.say(channel, `@${args.tags.username} done!`);
	} catch (e) {
		console.error(e);
		await client.say(
			channel,
			`@${args.tags.username} no response from stream, is it live?`
		);
	}
};
