import { describe, it, expect, vi } from "vitest";
import generatePrompts, {
	AI_MODEL,
	PROMPT_TEMPLATE,
} from "./generatePrompts.js";

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

describe("generatePrompts", () => {
	it("should return an array of prompts based on a topic", async () => {
		const mockApiResponse = {
			response: {
				text: () =>
					"1. First prompt\n2. Second prompt\n3. Third prompt",
			},
		};
		mockGenerateContent.mockResolvedValue(mockApiResponse);

		const mockTopic = "test topic";
		const prompts = await generatePrompts(mockTopic);

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
});
