export const generateRounds = (participants: string[]): string[][] => {
	const numRounds =
		participants.length % 2 === 0
			? participants.length - 1
			: participants.length;

	let rounds: string[][] = [];
	let arr = [...participants];

	for (let i = 0; i < numRounds; i++) {
		const roundMatches: string[] = [];

		for (let j = 0; j < participants.length / 2; j++) {
			const home = arr[j];
			const away = arr[participants.length - 1 - j];

			roundMatches.push(`${home} + ${away}`);
		}
		console.log(roundMatches);
		rounds.push(roundMatches);
		arr = [arr[0], ...arr.slice(2), arr[1]];
	}

	return rounds;
};
