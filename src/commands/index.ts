import { matchTranslationCommand } from "./translate";

export * from "./help";
export * from "./discord";
export * from "./uptime";
export * from "./pingPong";
export * from "./translate";
export * from "./subAndBits";
export * from "./duckJoke";
export * from "./danceParty";
export * from "./kanpai";
export * from "./chill";
export * from "./modSquad";
export * from "./song";
export * from "./hey";
export * from "./shoutouts";
export * from "./resub";

// get the word up to the first space
export const startsWith = (message: string) => {
	return message.split(" ")[0];
};

export enum Commands {
	Help = "?help",
	Discord = "?discord",
	ModSquad = "?modsquad",

	// auto generated
	Song = "?song",

	// Shoutouts
	Hey = "?hey",
	So = "?so",
	DJ = "?dj",

	SubThanks = "?sub",
	BitThanks = "?bits",
	GiftSubThanks = "?giftsub",
	Resub = "?resub",

	// Moderation
	DanceParty = "?danceparty",
	Chill = "?chill",

	// Fun
	DuckJoke = "?duckjoke",
	Kanpai = "?kanpai",

	// Temp
	Ping = "?ping",

	// Translation
	TranslationHelp = "?translate",
	TranslateText = "translation",
}

export const commandMatcher = (message: string) => {
	if (matchTranslationCommand(message)) {
		return Commands.TranslateText;
	}

	switch (startsWith(message)) {
		// Help
		case Commands.Help:
			return Commands.Help;
		case Commands.Discord:
			return Commands.Discord;
		case Commands.ModSquad:
			return Commands.ModSquad;

		// auto generated
		case Commands.Song:
			return Commands.Song;

		// Subs and Bits
		case Commands.SubThanks:
			return Commands.SubThanks;
		case Commands.BitThanks:
			return Commands.BitThanks;
		case Commands.GiftSubThanks:
			return Commands.GiftSubThanks;
		case Commands.Resub:
			return Commands.Resub;

		// Shoutouts
		case Commands.Hey:
			return Commands.Hey;
		case Commands.So:
			return Commands.So;
		case Commands.DJ:
			return Commands.DJ;

		// Fun
		case Commands.DuckJoke:
			return Commands.DuckJoke;
		case Commands.Kanpai:
			return Commands.Kanpai;

		// Moderation
		case Commands.DanceParty:
			return Commands.DanceParty;
		case Commands.Chill:
			return Commands.Chill;

		// Subs and Bits
		case Commands.Ping:
			return Commands.Ping;
		case Commands.TranslationHelp:
			return Commands.TranslationHelp;

		// Do nothing
		default:
			return null;
	}
};
