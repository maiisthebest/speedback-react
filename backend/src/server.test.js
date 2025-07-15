import { describe, it, expect, vi } from "vitest";
import supertest from "supertest";
import app from "./server.js";
import generatePrompts from "../api/generatePrompts.js";

vi.mock("../api/generatePrompts.js");

const request = supertest(app);

describe("POST /api/feedback-prompts", () => {
	it("should return 200 and prompts in the response body", async () => {
		const mockPrompts = ["Prompt 1", "Prompt 2"];

		vi.mocked(generatePrompts).mockResolvedValue(mockPrompts);

		const topic = "teamwork";
		const res = await request.post("/api/feedback-prompts").send({ topic });

		expect(generatePrompts).toHaveBeenCalledWith(topic);

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("prompts");
		expect(res.body.prompts).toEqual(mockPrompts);
	});
});
