import fetch from "cross-fetch";

const options = {
	method: "GET",
	url: "https://shazam.p.rapidapi.com/shazam-events/list",
	params: {
		artistId: "73406786",
		l: "en-US",
		from: "2022-12-31",
		limit: "50",
		offset: "0",
	},
	headers: {
		"X-RapidAPI-Key": process.env.RAPID_API_KEY,
		"X-RapidAPI-Host": "shazam.p.rapidapi.com",
	},
};

export async function getShazamSong() {
	const result = await fetch(options.url, {
		method: options.method,
		// headers: options.headers,
	});

	return result.json();
}
