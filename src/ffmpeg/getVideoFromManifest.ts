import { fetch } from "cross-fetch";

import { createFFmpeg } from "@ffmpeg/ffmpeg";

export interface Urls {
	audio_only: string;
	"160p": string;
	"360p": string;
	"480p": string;
	"720p60_alt": string;
	"720p60": string;
}

export interface TwitchStreamURLs {
	success: boolean;
	urls: Urls;
}

const ffmpeg = createFFmpeg({
	log: true,
});

export default async function getManifestFromCreator(creator: string) {
	if (!ffmpeg.isLoaded()) await ffmpeg.load();
	const manifest = await fetch(
		// `https://creator.mux.com/api/v1/video?filter[creator]=${creator}`
		`https://pwn.sh/tools/streamapi.py?url=twitch.tv%2F${creator}`
	);
	const manifestText: TwitchStreamURLs | undefined = await manifest.json();

	return manifestText;
}

export async function getAudioFromManifestURL(manifestUrl: string) {
	if (!ffmpeg.isLoaded()) await ffmpeg.load();

	const manifest = await fetch(manifestUrl);
	const manifestText = await manifest.text();
}
