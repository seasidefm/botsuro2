export async function getActiveMods() {
	const baseURl =
		"https://api.twitch.tv/helix/chat/chatters?broadcaster_id=577838946&moderator_id=744061580";

	const result = await fetch(baseURl, {
		method: "GET",
		headers: {
			"Client-ID": process.env.CLIENT_ID!,
			Authorization: `Bearer ${
				process.env.BOT_TOKEN?.split("oauth:")?.[1]
			}`,
			"Content-Type": "application/json",
		},
	});

	return result.json();
}
