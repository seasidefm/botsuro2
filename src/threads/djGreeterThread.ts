import { isMainThread, parentPort } from "worker_threads";
import { getLogger } from "../logger";
import { djGreet } from "../tasks";
import { CommandArgs } from "../commands/shared";
import { getRedisClient } from "../cache/redis";

if (isMainThread) {
	throw new Error("This file should be run as a worker thread");
}

const logger = getLogger();

parentPort!.on("message", async (message: CommandArgs) => {
	const isDj = await djGreet(message);

	if (isDj) {
		const redis = await getRedisClient();
		const username = message.tags["display-name"];
		logger.log(`DJ Match: ${username}`);

		// Check if we've already greeted this user
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
	}
});
