import { matchTranslationCommand } from "./translate";

export * from "./help";
export * from "./discord";
export * from "./uptime";
export * from "./pingPong";
export * from "./translate";
export * from "./subAndBits";
export * from "./duckJoke";
export * from "./danceParty";

// get the word up to the first space
export const startsWith = (message: string) => {
	return message.split(" ")[0];
};

export enum Commands {
	Help = "?help",
	Discord = "?discord",

	SubThanks = "?sub",
	BitThanks = "?bits",
	GiftSubThanks = "?giftsub",

	// Fun
	DuckJoke = "?duckjoke",
	DanceParty = "?danceparty",

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

		// Subs and Bits
		case Commands.SubThanks:
			return Commands.SubThanks;
		case Commands.BitThanks:
			return Commands.BitThanks;
		case Commands.GiftSubThanks:
			return Commands.GiftSubThanks;

		// Fun
		case Commands.DuckJoke:
			return Commands.DuckJoke;
		case Commands.DanceParty:
			return Commands.DanceParty;

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
