import { fetch } from "cross-fetch";

import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { getLogger } from "../logger";
import * as fs from "fs";

export interface Urls {
	audio_only: string;
	"160p": string;
	"360p": string;
	"480p": string;
	"720p60_alt": string;
	"720p60": string;
	"720p": string;
}

interface SourceStream {
	quality:
		| "160p"
		| "360p"
		| "480p"
		| "720p (source)"
		| "720p60"
		| "720p60_alt"
		| "audio_only";
	resolution: string | null;
	url: string;
}

export interface TwitchStreamURLs {
	success: boolean;
	urls: Urls;
}

const ffmpeg = createFFmpeg({
	log: true,
});

const logger = getLogger();

export default async function manifestFromCreatorName(creator: string) {
	const manifest = await fetch(
		// `https://creator.mux.com/api/v1/video?filter[creator]=${creator}`
		`https://pwn.sh/tools/streamapi.py?url=twitch.tv%2F${creator}`
	);

	const manifestText: TwitchStreamURLs | undefined = await manifest.json();

	// audio_only seems to be the only predictcable key
	return manifestText?.urls["audio_only"];
}

export async function getPCMFromArrayBuffers(buffer: Buffer) {
	if (!ffmpeg.isLoaded()) await ffmpeg.load();

	const fileName = `audio.mp4`;
	logger.log(`Writing ${fileName}`);
	ffmpeg.FS("writeFile", fileName, buffer);

	const data = ffmpeg.FS("readFile", fileName);

	// save it to local disk for confirmation
	if (fs.existsSync(fileName)) fs.rmSync(fileName);
	fs.writeFileSync(fileName, data);

	return [];
}
