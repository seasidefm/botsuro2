export namespace ShazamApi {
	export interface Match {
		id: string;
		offset: number;
		timeskew: number;
		frequencyskew: number;
	}

	export interface Images {
		background: string;
		coverart: string;
		coverarthq: string;
		joecolor: string;
	}

	export interface Share {
		subject: string;
		text: string;
		href: string;
		image: string;
		twitter: string;
		html: string;
		avatar: string;
		snapchat: string;
	}

	export interface Action {
		name: string;
		type: string;
		id: string;
		uri: string;
	}

	export interface Action2 {
		name: string;
		type: string;
		uri: string;
	}

	export interface Beacondata {
		type: string;
		providername: string;
	}

	export interface Option {
		caption: string;
		actions: Action2[];
		beacondata: Beacondata;
		image: string;
		type: string;
		listcaption: string;
		overflowimage: string;
		colouroverflowimage: boolean;
		providername: string;
	}

	export interface Images2 {
		overflow: string;
		default: string;
	}

	export interface Action3 {
		name: string;
		type: string;
		uri: string;
	}

	export interface Provider {
		caption: string;
		images: Images2;
		actions: Action3[];
		type: string;
	}

	export interface Hub {
		type: string;
		image: string;
		actions: Action[];
		options: Option[];
		providers: Provider[];
		explicit: boolean;
		displayname: string;
	}

	export interface Artist {
		id: string;
		adamid: string;
	}

	export interface Genres {
		primary: string;
	}

	export interface Urlparams {
		"{tracktitle}": string;
		"{trackartist}": string;
	}

	export interface Action4 {
		name: string;
		type: string;
		uri: string;
	}

	export interface Apple {
		actions: Action4[];
	}

	export interface Myshazam {
		apple: Apple;
	}

	export interface Metapage {
		image: string;
		caption: string;
	}

	export interface Metadata {
		title: string;
		text: string;
	}

	export interface Beacondata2 {
		lyricsid: string;
		providername: string;
		commontrackid: string;
	}

	export interface Dimensions {
		width: number;
		height: number;
	}

	export interface Image {
		dimensions: Dimensions;
		url: string;
	}

	export interface Share2 {
		subject: string;
		text: string;
		href: string;
		image: string;
		twitter: string;
		html: string;
		avatar: string;
		snapchat: string;
	}

	export interface Action5 {
		name: string;
		type: string;
		share: Share2;
		uri: string;
	}

	export interface Youtubeurl {
		caption: string;
		image: Image;
		actions: Action5[];
	}

	export interface Section {
		type: string;
		metapages: Metapage[];
		tabname: string;
		metadata: Metadata[];
		text: string[];
		footer: string;
		beacondata: Beacondata2;
		youtubeurl: Youtubeurl;
	}

	export interface Track {
		layout: string;
		type: string;
		key: string;
		title: string;
		subtitle: string;
		images: Images;
		share: Share;
		hub: Hub;
		url: string;
		artists: Artist[];
		isrc: string;
		genres: Genres;
		urlparams: Urlparams;
		myshazam: Myshazam;
		albumadamid: string;
		sections: Section[];
	}

	export interface RootObject {
		matches: Match[];
		timestamp: number;
		timezone: string;
		tagid: string;
		track: Track;
	}
}
