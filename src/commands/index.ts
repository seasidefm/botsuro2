import { matchTranslationCommand } from "./translate";

export * from "./help";
export * from "./uptime";
export * from "./pingPong";
export * from "./translate";

// get the word up to the first space
export const startsWith = (message: string) => {
	return message.split(" ")[0];
};

export enum Commands {
	Help = "?help",
	Uptime = "?uptime",
	Ping = "?ping",
	TranslationHelp = "?translate",
	TranslateText = "translation",
}

export const commandMatcher = (message: string) => {
	if (matchTranslationCommand(message)) {
		return Commands.TranslateText;
	}

	switch (startsWith(message)) {
		case Commands.Help:
			return Commands.Help;
		case Commands.Uptime:
			return Commands.Uptime;
		case Commands.Ping:
			return Commands.Ping;
		case Commands.TranslationHelp:
			return Commands.TranslationHelp;
		default:
			return null;
	}
};
