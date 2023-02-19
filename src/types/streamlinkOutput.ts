export namespace StreamlinkOutput {
	export interface Metadata {
		id: string;
		author: string;
		category: string;
		title: string;
	}

	export interface Headers {
		"User-Agent": string;
		"Accept-Encoding": string;
		Accept: string;
		Connection: string;
		referer: string;
		origin: string;
	}

	export interface Stream {
		type: string;
		url: string;
		headers: Headers;
		master: string;
	}

	export interface Streams {
		[streamQuality: string]: Stream;
	}

	export interface RootObject {
		plugin: string;
		metadata: Metadata;
		streams: Streams;
	}
}
