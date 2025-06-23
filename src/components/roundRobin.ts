export const generateRounds = (participants: string[]): string[][] => {
	const isEven = participants.length % 2 === 0;
	const numRounds = isEven ? participants.length - 1 : participants.length;

	let rounds: string[][] = [];
	let players = [...participants];

	for (let round = 0; round < numRounds; round++) {
		const roundMatches: string[] = [];

		for (let j = 0; j < players.length / 2; j++) {
			const home = players[j];
			const away = players[players.length - 1 - j];

			roundMatches.push(`${home} + ${away}`);
		}
		rounds.push(roundMatches);
		players.splice(1, 0, players.pop()!);
	}

	return rounds;
};
