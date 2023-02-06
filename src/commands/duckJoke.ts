import { Client, CommandArgs } from "./shared";
import { getTimers } from "../state/timers";

const jokes = [
	{
		jokeQuestion: "Why did the duck go to the chiropractor?",
		jokeAnswer: "To get it’s back quacked.",
	},
	{
		jokeQuestion: "What time do ducks get up?",
		jokeAnswer: "The quack of dawn.",
	},
	{
		jokeQuestion: "What do you call a duck that steals?",
		jokeAnswer: "A robber duck.",
	},
	{
		jokeQuestion: "What do you get when a duck bends over?",
		jokeAnswer: "A buttquack.",
	},
	{
		jokeQuestion: "Where do ducks go when they are sick?",
		jokeAnswer: "To the ducktor.",
	},
	{
		jokeQuestion: "What did the duck say to the comedian?",
		jokeAnswer: "You're quacking me up!",
	},
	{
		jokeQuestion: "What shows do ducks watch on television?",
		jokeAnswer: "Duckumentaries.",
	},
	{
		jokeQuestion: "Why do ducks like New Years?",
		jokeAnswer: "They like to watch the fireQUACKERS.",
	},
	{
		jokeQuestion: "Why did the duck get a second job?",
		jokeAnswer: "He had too many bills.",
	},
	{
		jokeQuestion: "What is it called when it’s raining ducks and chickens?",
		jokeAnswer: "Fowl weather.",
	},
	{
		jokeQuestion: "{Why did the teenage duck get grounded?",
		jokeAnswer: "He used fowl language.",
	},
	{
		jokeQuestion: "What’s a duck’s favorite fantasy movie?",
		jokeAnswer: "Lord of the Wings.",
	},
	{
		jokeQuestion: "What’s a duck’s favorite taco topping?",
		jokeAnswer: "Quackamole!",
	},
	{
		jokeQuestion: "Where did the duck go when he was sick?",
		jokeAnswer: "To the ducktor.",
	},
	{
		jokeQuestion: "Why did the duck cross the playground?",
		jokeAnswer: "To get to the other slide.",
	},
	{
		jokeQuestion: "Why did the duck go to the bank?",
		jokeAnswer: "He wanted to get a new bill.",
	},
	{
		jokeQuestion: "What do they say about French ducks?",
		jokeAnswer: "They have a certain je ne sais quack about them.",
	},
	{
		jokeQuestion: "Why did the duck put on makeup?",
		jokeAnswer: "They wanted to be seDUCKtive.",
	},
	{
		jokeQuestion: "What does a duck say when they’re sick?",
		jokeAnswer: "I'm feeling under the feather.",
	},
	{
		jokeQuestion: "What point of a view does a duck write a book in?",
		jokeAnswer: "Bird person.",
	},
	{
		jokeQuestion: "What news did the duck get from the doctor?",
		jokeAnswer: "He had a perfect bill of health!",
	},
	{
		jokeQuestion: "Why did the duck get grounded?",
		jokeAnswer: "He had a fowl mouth.",
	},
	{
		jokeQuestion: "What does a duck say when they disagree with someone?",
		jokeAnswer: "That’s reduckulous.",
	},
	{
		jokeQuestion: "What do you call the evil ruler of a small pond?",
		jokeAnswer: "A ducktator!",
	},
	{
		jokeQuestion: "What game does a duck play at the bar?",
		jokeAnswer: "Bill-iards.",
	},
	{
		jokeQuestion: "What do you call a ghost duck?",
		jokeAnswer: "A poultrygeist!",
	},
	{ jokeQuestion: "Where do ducks live?", jokeAnswer: "Bill-dings!" },
	{
		jokeQuestion:
			"What do you call it when a group of mallards is making too much noise?",
		jokeAnswer: "Quackophany!",
	},
	{
		jokeQuestion: "Why couldn't the duck open the pistacho?",
		jokeAnswer: "It was a tough nut to quack.",
	},
	{
		jokeQuestion: "Why did the duck need the window fixed?",
		jokeAnswer: "There was a quack in it!",
	},

	{
		jokeQuestion:
			"What language can a duck who converses with geese speak fluently?",
		jokeAnswer: "Portu-geese.",
	},

	{
		jokeQuestion: "Why did the duck end up in jail?",
		jokeAnswer: "He was selling quack. (edited)",
	},

	{
		jokeQuestion: "Why did the duck clean their records?",
		jokeAnswer: "It didn't want to hear them quackle.",
	},

	{
		jokeQuestion: "What did the duck wear to his wedding?",
		jokeAnswer: "A DUCK-sedo!",
	},

	{
		jokeQuestion: "Why did the duckling almost fall on the sidewalk?",
		jokeAnswer: "They tripped on a quack.",
	},

	{
		jokeQuestion: "How do ducks make pancakes?",
		jokeAnswer: "They use bis-quack.",
	},
];

const punchlineEmotes = ["🥁", "🦆", "seasid3IsForCool"];

const getARandomJoke = () => {
	const jokeIndex = Math.floor(Math.random() * jokes.length + 1);
	return jokes[jokeIndex];
};

export const duckJokeCommand = async (client: Client, args: CommandArgs) => {
	const { channel, self } = args;
	if (self) return;

	const timers = getTimers();

	if (!timers.hasTimer("duckJoke") || timers.timerExpired("duckJoke")) {
		const joke = getARandomJoke();

		// Step 1, send the joke question
		await client.say(
			channel,
			`@${args.tags.username} ${joke.jokeQuestion}`
		);

		const randomPunchlineEmote =
			punchlineEmotes[
				Math.floor(Math.random() * (punchlineEmotes.length - 1))
			];

		// Step 2, send the joke answer
		setTimeout(async () => {
			await client.say(
				channel,
				`@${args.tags.username} ${joke.jokeAnswer} ${randomPunchlineEmote}`
			);
		}, 3000);

		// Step 3, set the timer
		timers.setTimer("duckJoke");
	} else {
		await client.say(
			channel,
			`@${args.tags.username} Sorry, duck jokes are on cooldown for ${
				timers.getRemainingTime("duckJoke") / 1000
			} seconds seasid3IsForCool`
		);
	}
};
