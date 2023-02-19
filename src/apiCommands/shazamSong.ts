import fetch from "cross-fetch";
import axios from "axios";
import { fs } from "memfs";

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

interface AuddResult {
	artist: string;
	title: string;
	album: string;
	release_date: string;
	label: string;
	timecode: string;
	song_link: string;
	// apple_music: [Object];
	// spotify: [Object];
}

export async function getAuddId(song: Buffer): Promise<AuddResult | null> {
	fs.writeFileSync("/example.mp3", song);

	const data = {
		api_token: process.env.AUDD_KEY || "AUDD key not set",
		file: fs.createReadStream("/example.mp3"),
		return: "apple_music,spotify",
	};

	return axios({
		method: "post",
		url: "https://api.audd.io/",
		data: data,
		headers: { "Content-Type": "multipart/form-data" },
	}).then((response) => {
		console.log(response.data);
		return response.data.result as AuddResult | null;
	});
}
