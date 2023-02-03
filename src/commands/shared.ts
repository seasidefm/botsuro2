import * as tmi from "tmi.js";

export interface CommandArgs {
	channel: string;
	tags: any;
	message: string;
	self: boolean;
}

export type Client = tmi.Client;
