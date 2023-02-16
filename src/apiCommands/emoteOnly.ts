import fetch from "cross-fetch";

export async function setEmoteOnly(state: boolean) {
	const baseURl =
		"https://api.twitch.tv/helix/chat/settings?broadcaster_id=577838946&moderator_id=744061580";
	const result = await fetch(baseURl, {
		method: "PATCH",
		headers: {
			"Client-ID": process.env.CLIENT_ID!,
			Authorization: `Bearer ${
				process.env.BOT_TOKEN?.split("oauth:")?.[1]
			}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			emote_mode: state,
		}),
	});

	return result.status === 200;
}
