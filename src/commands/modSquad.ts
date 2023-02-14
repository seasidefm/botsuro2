import { Client, CommandArgs } from "./shared";

const mods = [
	"@tinyjams",
	"@oldfisheyes",
	"@koala91_",
	"@LeoAccorsi",
	"@Duke_Ferdinand",
];

export const modSquad = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	await client.say(
		channel,
		`LET'S GO, MOD SQUAD FORCE! | FORM, FEET AND LEGS! ${mods[0]} ${mods[1]} | FORM, ARMS AND HANDS! ${mods[2]} ${mods[3]} | AND I'LL FORM THE HEAD ${mods[4]}`
	);
};
