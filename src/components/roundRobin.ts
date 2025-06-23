export const generateRounds = (participants: string[]): string[][] => {
	let players = [...participants];

	if (players.length % 2 !== 0) {
		players.push("BYE");
	}

	let rounds: string[][] = [];

	for (let round = 0; round < players.length - 1; round++) {
		const roundMatches: string[] = [];

		for (let pairIndex = 0; pairIndex < players.length / 2; pairIndex++) {
			const personA = players[pairIndex];
			const personB = players[players.length - 1 - pairIndex];

			roundMatches.push(`${personA} ↔ ${personB}`);
		}
		rounds.push(roundMatches);
		players.splice(1, 0, players.pop()!);
	}

	return rounds;
};
