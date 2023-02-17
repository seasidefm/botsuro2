import fetch from "cross-fetch";

import { ShazamApi } from "../types/shazamApi";
import RootObject = ShazamApi.RootObject;

export async function getShazamSong(
	song: Buffer
): Promise<RootObject | undefined> {
	// base64 encode the song
	const base64Song = song.toString("base64");

	const url =
		"https://shazam.p.rapidapi.com/songs/v2/detect?timezone=America%2FChicago&locale=en-US";

	const options = {
		method: "POST",
		headers: {
			"content-type": "text/plain",
			"X-RapidAPI-Key":
				process.env.RAPID_API_KEY || "RapidAPI key not set",
			"X-RapidAPI-Host": "shazam.p.rapidapi.com",
		},
		body: base64Song,
	};

	return await fetch(url, options)
		.then((res) => res.json())
		.catch((err) => console.error("error:" + err));
}
