export * from "./help";
export * from "./uptime";
export * from "./pingPong";

// get the word up to the first space
export const startsWith = (message: string) => {
	return message.split(" ")[0];
};

export enum Commands {
	Help = "?help",
	Uptime = "?uptime",
	Ping = "?ping",
}

export const commandMatcher = (message: string) => {
	switch (startsWith(message)) {
		case Commands.Help:
			return Commands.Help;
		case Commands.Uptime:
			return Commands.Uptime;
		case Commands.Ping:
			return Commands.Ping;
		default:
			return null;
	}
};
