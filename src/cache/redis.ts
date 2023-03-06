import { createClient } from "redis";

let client: ReturnType<typeof createClient>;
export async function getRedisClient() {
	if (client) return client;

	client = createClient({
		url: process.env.REDIS_URL!,
	});

	client.on("error", (err) => console.log("Redis Client Error", err));

	await client.connect();

	return client;
}
