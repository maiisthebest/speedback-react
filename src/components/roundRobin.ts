export const generateRounds = (participants: string[]): string[][] => {
	let players = [...participants];

	if (players.length % 2 !== 0) {
		players.push("BYE");
	}

	let rounds: string[][] = [];

	for (let round = 0; round < players.length - 1; round++) {
		const roundMatches: string[] = [];

		for (let j = 0; j < players.length / 2; j++) {
			const home = players[j];
			const away = players[players.length - 1 - j];

			roundMatches.push(`${home} ↔ ${away}`);
		}
		rounds.push(roundMatches);
		players.splice(1, 0, players.pop()!);
	}

	return rounds;
};
