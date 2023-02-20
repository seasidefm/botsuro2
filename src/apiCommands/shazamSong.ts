import fetch from "cross-fetch";

import { ShazamApi } from "../types/shazamApi";
import RootObject = ShazamApi.RootObject;

export async function getShazamSong(
	creator: string
): Promise<RootObject | undefined> {
	const url = process.env.SONG_ID_HOST + "/identify/" + creator;

	return await fetch(url, {
		method: "GET",
	}).then((res) => res.json());
}
