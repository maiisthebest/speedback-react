import { describe, it, expect, vi } from "vitest";
import {
	AI_MODEL,
	PROMPT_TEMPLATE,
	generateFeedbackPrompts,
} from "./generateFeedbackPrompts.js";

vi.mock("@google/generative-ai", () => {
	const mockGenerateContent = vi.fn();
	const mockGetGenerativeModel = vi.fn(() => ({
		generateContent: mockGenerateContent,
	}));
	const GoogleGenerativeAI = vi.fn(() => ({
		getGenerativeModel: mockGetGenerativeModel,
	}));
	return { GoogleGenerativeAI, mockGetGenerativeModel, mockGenerateContent };
});

const { mockGetGenerativeModel, mockGenerateContent } = await import(
	"@google/generative-ai"
);

describe("generateFeedbackPrompts", () => {
	it("returns an array of prompts based on a topic", async () => {
		const mockApiResponse = {
			response: {
				text: () =>
					"1. First prompt\n2. Second prompt\n3. Third prompt",
			},
		};
		mockGenerateContent.mockResolvedValue(mockApiResponse);

		const mockTopic = "test topic";
		const prompts = await generateFeedbackPrompts(mockTopic);

		expect(mockGetGenerativeModel).toHaveBeenCalledWith({
			model: AI_MODEL,
		});

		const expectedPrompt = PROMPT_TEMPLATE.replace("{topic}", mockTopic);
		expect(mockGenerateContent).toHaveBeenCalledWith(expectedPrompt);

		expect(prompts).toEqual([
			"1. First prompt",
			"2. Second prompt",
			"3. Third prompt",
		]);
	});

	it("should correctly process and clean response from GenAI", async () => {
		const mockApiResponse = {
			response: {
				text: () =>
					"  * Prompt 1 with leading space\n*Prompt 2 with no space\n\n  *   Prompt 3 with asterisk and space\n*Prompt 4\n",
			},
		};
		mockGenerateContent.mockResolvedValue(mockApiResponse);

		const mockTopic = "test topic";
		const prompts = await generateFeedbackPrompts(mockTopic);

		expect(prompts).toEqual([
			"Prompt 1 with leading space",
			"Prompt 2 with no space",
			"Prompt 3 with asterisk and space",
			"Prompt 4",
		]);
	});

	it("throws an error when the AI service fails", async () => {
		vi.stubEnv("GOOGLE_API_KEY", "test-key");

		mockGenerateContent.mockRejectedValue(
			new Error("AI service unavailable"),
		);

		await expect(generateFeedbackPrompts("any topic")).rejects.toThrow(
			"Failed to generate prompts from GenAI",
		);
	});
});
