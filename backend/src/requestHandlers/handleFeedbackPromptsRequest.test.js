import { describe, it, expect, vi } from "vitest";
import { handleFeedbackPromptsRequest } from "./handleFeedbackPromptsRequest.js";
import { generateFeedbackPrompts } from "../generateFeedbackPrompts.js";

vi.mock("../generateFeedbackPrompts.js", () => ({
	generateFeedbackPrompts: vi.fn(),
}));

describe("handleFeedbackPromptsRequest", () => {
	it("should call generateFeedbackPrompts with the correct topic and return prompts", async () => {
		const mockPrompts = ["Prompt 1", "Prompt 2"];
		vi.mocked(generateFeedbackPrompts).mockResolvedValue(mockPrompts);

		const testTopic = "test topic";
		const req = {
			body: { topic: testTopic },
		};
		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			json: vi.fn(),
		};

		await handleFeedbackPromptsRequest(req, res);

		expect(generateFeedbackPrompts).toHaveBeenCalledWith(testTopic);
		expect(res.statusCode).toBe(200);
		expect(res.json).toHaveBeenCalledWith({ prompts: mockPrompts });
	});

	it("should return 400 if topic is missing", async () => {
		const req = {
			body: {},
		};
		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			json: vi.fn(),
		};

		await handleFeedbackPromptsRequest(req, res);

		expect(res.statusCode).toBe(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "Topic is required and must be a non-empty string.",
		});
	});

	it("should return 400 if topic is empty", async () => {
		const req = {
			body: { topic: "     " },
		};
		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			json: vi.fn(),
		};

		await handleFeedbackPromptsRequest(req, res);

		expect(res.statusCode).toBe(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "Topic is required and must be a non-empty string.",
		});
	});

	it("should return 500 if generateFeedbackPrompts throws an error", async () => {
		vi.mocked(generateFeedbackPrompts).mockImplementation(() => {
			throw new Error("AI error");
		});

		const req = {
			body: { topic: "test topic" },
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			json: vi.fn(),
		};

		await handleFeedbackPromptsRequest(req, res);

		expect(res.statusCode).toBe(500);
		expect(res.json).toHaveBeenCalledWith({
			error: "Failed to generate prompts due to an internal error.",
		});
	});
});
