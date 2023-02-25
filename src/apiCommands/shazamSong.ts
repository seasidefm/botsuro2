import fetch from "cross-fetch";

import { ShazamApi } from "../types/shazamApi";
import RootObject = ShazamApi.RootObject;

interface SongId {
	acr?: {
		song: string | null;
		artist: string | null;
		link: string | null;
	};
	audd?: {
		song: string | null;
		artist: string | null;
		link: string | null;
	};
	shazam?: RootObject | undefined;
}

interface Song {
	song: string;
	artist: string;
	link: string;
}

export async function identifySong(creator: string): Promise<Song | null> {
	const url = process.env.SONG_ID_HOST + "/identify/" + creator;

	const data: SongId = await fetch(url, {
		method: "GET",
	}).then((res) => res.json());

	console.log(data);

	// ACRCloud
	if (data.acr?.song) {
		return {
			song: data.acr.song,
			artist: data.acr.artist!,
			link: data.acr.link!,
		};
	}

	// Audd.io
	if (data.audd?.song) {
		return {
			song: data.audd.song,
			artist: data.audd.artist!,
			link: data.audd.link!,
		};
	}

	// Shazam
	if (data.shazam) {
		return {
			song: data.shazam.track.title,
			artist: data.shazam.track.subtitle,
			link: data.shazam.track.share.href,
		};
	}

	return null;
}
