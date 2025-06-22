import { describe, it, expect } from "vitest";
import { generateRounds } from "./roundRobin";

describe("roundRobin", () => {
	it("should generate 1 round of 1 pair for 2 participants (even number of participants)", () => {
		const participants = ["Alice", "Bob"];
		const rounds = generateRounds(participants);

		expect(rounds).toEqual([["Alice + Bob"]]);
	});

	it("should generate 3 rounds of 2 pairs for 4 participants (even number of participants)", () => {
		const participants = ["Alice", "Bob", "Charlie", "David"];
		const rounds = generateRounds(participants);

		expect(rounds).toEqual([
			["Alice + David", "Bob + Charlie"],
			["Alice + Bob", "Charlie + David"],
			["Alice + Charlie", "David + Bob"],
		]);
	});
});
