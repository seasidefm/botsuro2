import { exec } from "child_process";

import { getLogger } from "../logger";

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

const logger = getLogger();

type FileName = string;
export default async function manifestFromCreatorName(creator: string) {
	return new Promise<FileName>((resolve, reject) => {
		const fileName = `tmp/${new Date().getTime()}-${creator}.mp4`;
		logger.log(`Saving as ${fileName}`);
		exec(
			"streamlink " +
				// NOTE: this MUST be a token obtained from a browser session
				`"--twitch-api-header=Authorization=OAuth ${process.env.WATCH_TOKEN}" ` +
				"--twitch-disable-ads " +
				"--twitch-low-latency " +
				"--hls-duration 00:05 " +
				`--ffmpeg-audio-transcode "aac" ` +
				"--retry-open 10 " +
				`-r ${fileName} ` +
				`https://twitch.tv/${creator.toLowerCase()} "480p,best"`,
			(err, stdout, _) => {
				if (err) {
					logger.error(err.message);
					reject(err.message);
				} else {
					resolve(fileName);
				}
			}
		);
	});
}
