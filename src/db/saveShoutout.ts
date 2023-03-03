import { PrismaClient } from "@prisma/client";
import { getRedisClient } from "../cache/redis";

export enum StreamerType {
	DJ = "DJ",
	NON_DJ = "NON_DJ",
}

export async function saveShoutout(
	streamerName: string,
	streamerType: StreamerType
) {
	try {
		const prisma = new PrismaClient();
		const redis = await getRedisClient();

		const so = await prisma.streamerShoutout.create({
			data: {
				streamer: streamerName,
				streamerType: streamerType,
			},
		});

		// expire in 6 hours
		await redis.set(streamerName, "true");
		await redis.expire(streamerName, 60 * 60 * 6);

		return so;
	} catch (error) {
		if ((error as Error).message.includes("Unique constraint failed")) {
			return;
		}
		console.error(error);
	}
}

export async function hasUserReceivedShoutout(user: string) {
	try {
		const prisma = new PrismaClient();

		const result = await prisma.streamerShoutout.findFirst({
			where: {
				streamer: user,
			},
		});

		return !!result;
	} catch (error) {
		console.error(error);
	}

	return false;
}
