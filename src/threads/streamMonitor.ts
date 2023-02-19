import { isMainThread, parentPort } from "worker_threads";
import { exec } from "child_process";
import { getLogger } from "../logger";

if (isMainThread) {
	throw new Error("This file should be run as a worker thread");
}

const logger = getLogger();
parentPort!.on("message", async (message) => {
	const { creator } = message;
	await new Promise<string>((resolve, reject) => {
		const fileName = `tmp/${new Date().getTime()}-${creator}.mp4`;
		logger.log(`Saving stream as ${fileName}`);
		exec(
			"streamlink " +
				// NOTE: this MUST be a token obtained from a browser session
				`"--twitch-api-header=Authorization=OAuth ${process.env.WATCH_TOKEN}" ` +
				"--twitch-low-latency " +
				`--ffmpeg-audio-transcode "aac" ` +
				// Give it roughly 20 seconds for pre-roll crap to play
				"--retry-open 10 " +
				`-r ${fileName} ` +
				`https://twitch.tv/${creator.toLowerCase()} "best"`,
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
});
