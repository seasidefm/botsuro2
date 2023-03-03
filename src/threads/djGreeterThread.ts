import { isMainThread, parentPort } from "worker_threads";
import { getLogger } from "../logger";
import { CommandArgs } from "../commands/shared";
import { getRedisClient } from "../cache/redis";
import { hasUserReceivedShoutout } from "../db/saveShoutout";

if (isMainThread) {
	throw new Error("This file should be run as a worker thread");
}

const logger = getLogger();

parentPort!.on("message", async (message: CommandArgs) => {
	const redis = await getRedisClient();
	const username = message.tags["display-name"];

	// Check if we've already greeted this user
	const userReceivedShoutout = await hasUserReceivedShoutout(username);
	if (!userReceivedShoutout) {
		logger.log(`${username} has not received a shoutout, ignoring`);
		return;
	}

	logger.log(`DJ Match: ${username}`);

	const hasGreeted = await redis.get(username);
	if (hasGreeted === "true") {
		logger.log(`DJ Match: ${username} already greeted`);
		return;
	}

	// expire in 6 hours
	await redis.set(username, "true");
	await redis.expire(username, 60 * 60 * 6);

	setTimeout(() => {
		parentPort!.postMessage({
			type: "dj-match",
			dj: username,
			args: message,
		});
	}, 4000);
});
