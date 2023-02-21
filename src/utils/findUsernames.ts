export const findUsernames = (message: string) => {
	const regex = /@([a-zA-Z0-9_]+)/g;
	return message.match(regex);
};
