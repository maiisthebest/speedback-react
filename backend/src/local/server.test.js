import { describe, it, expect, vi } from "vitest";
import supertest from "supertest";
import app from "./server.js";
import { handleFeedbackPromptsRequest } from "../requestHandlers/handleFeedbackPromptsRequest.js";

vi.mock("../requestHandlers/handleFeedbackPromptsRequest.js");

const request = supertest(app);

describe("POST /api/feedback-prompts", () => {
	it("should return 200 and prompts for a valid POST request", async () => {
		const mockPrompts = ["Prompt 1", "Prompt 2"];

		vi.mocked(handleFeedbackPromptsRequest).mockImplementation((_, res) => {
			res.status(200).json({ prompts: mockPrompts });
		});

		const topic = "teamwork";
		const res = await request.post("/api/feedback-prompts").send({ topic });

		expect(handleFeedbackPromptsRequest).toHaveBeenCalledWith(
			expect.anything(),
			expect.anything(),
			expect.anything(),
		);

		expect(res.statusCode).toBe(200);
		expect(res.body.prompts).toEqual(mockPrompts);
	});
});
