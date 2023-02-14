export async function setSlowMode(state: boolean, duration: number = 3) {
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
			slow_mode: state,
			slow_mode_wait_time: duration,
		}),
	});

	return result.status === 200;
}
