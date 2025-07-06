const request = require("supertest");
const app = require("./server");

jest.mock("./generatePrompts");
const generatePrompts = require("./generatePrompts");

describe("POST /api/feedback-prompts", () => {
	it("should return 200 and prompts in the response body", async () => {
		generatePrompts.mockResolvedValue(["Prompt 1", "Prompt 2"]);

		const topic = "teamwork";
		const res = await request(app)
			.post("/api/feedback-prompts")
			.send({ topic });

		expect(generatePrompts).toHaveBeenCalledWith(topic);

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("prompts");
		expect(res.body.prompts).toBeInstanceOf(Array);
	});
});
