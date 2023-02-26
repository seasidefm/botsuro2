import fetch from "cross-fetch";

import { ShazamApi } from "../types/shazamApi";
import RootObject = ShazamApi.RootObject;

interface SongId {
	acr?: {
		title: string | null;
		artist: string | null;
		link: string | null;
	};
	audd?: {
		title: string | null;
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

	const d = {
		song: "",
		artist: "",
		link: "",
	};

	// ACRCloud
	if (data.acr?.title) {
		d.song = d.song ? d.song : data.acr.title;
		d.artist = d.artist ? d.artist : data.acr.artist!;
		d.link = d.link ? d.link : data.acr.link!;
	}

	// Shazam
	if (data.shazam?.track) {
		d.song = d.song ? d.song : data.shazam.track.title;
		d.artist = d.artist ? d.artist : data.shazam.track.subtitle;
		d.link = d.link ? d.link : data.shazam.track.share.href;
	}

	// Audd.io
	if (data.audd?.title) {
		d.song = d.song ? d.song : data.audd.title;
		d.artist = d.artist ? d.artist : data.audd.artist!;
		d.link = d.link ? d.link : data.audd.link!;
	}

	if (d.song) {
		return d;
	}

	return null;
}
