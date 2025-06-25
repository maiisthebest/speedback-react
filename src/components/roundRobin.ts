export const generateRounds = (participants: string[]): string[][] => {
	let players = [...participants];

	if (players.length % 2 !== 0) {
		players.push("BYE");
	}

	const totalRounds = players.length - 1;
	const totalPairsPerRound = players.length / 2;
	const rounds: string[][] = [];

	for (let round = 0; round < totalRounds; round++) {
		const roundMatches: string[] = [];

		for (let pairIndex = 0; pairIndex < totalPairsPerRound; pairIndex++) {
			const personA = players[pairIndex];
			const personB = players[players.length - 1 - pairIndex];

			if (personA === "BYE") {
				roundMatches.push(`${personB} sits out`);
			} else if (personB === "BYE") {
				roundMatches.push(`${personA} sits out`);
			} else roundMatches.push(`${personA} ↔ ${personB}`);
		}
		rounds.push(roundMatches);
		players.splice(1, 0, players.pop()!);
	}

	return rounds;
};
