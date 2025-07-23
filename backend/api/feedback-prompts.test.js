import { describe, it, expect, vi } from "vitest";
import handler from "./feedback-prompts.js";
import { handleFeedbackPromptsRequest } from "../src/requestHandlers/handleFeedbackPromptsRequest.js";

vi.mock("../src/requestHandlers/handleFeedbackPromptsRequest.js");

describe("POST /feedback-prompts", () => {
	it("should return 200 and prompts for a valid POST request", async () => {
		const mockPrompts = ["Prompt 1", "Prompt 2"];
		vi.mocked(handleFeedbackPromptsRequest).mockImplementation(() => {
			res.status(200).json({ prompts: mockPrompts });
		});

		const testTopic = "test topic";
		const req = {
			method: "POST",
			headers: { origin: process.env.FRONTEND_URL },
			body: { topic: testTopic },
		};

		const res = {
			statusCode: 0,
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			json: vi.fn((data) => {
				res.body = data;
			}),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.setHeader).toHaveBeenCalledWith(
			"Access-Control-Allow-Origin",
			process.env.FRONTEND_URL,
		);
		expect(res.setHeader).toHaveBeenCalledWith(
			"Access-Control-Allow-Methods",
			"POST, OPTIONS",
		);
		expect(res.setHeader).toHaveBeenCalledWith(
			"Access-Control-Allow-Headers",
			"Content-Type",
		);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ prompts: mockPrompts });
	});

	it("should return 405 for non-POST requests", async () => {
		const req = {
			method: "GET",
			headers: { origin: process.env.FRONTEND_URL },
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			json: vi.fn(),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.statusCode).toBe(405);
		expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
	});

	it("should return 403 for forbidden origin", async () => {
		const req = {
			method: "POST",
			headers: { origin: "http://evil-app.com" },
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			json: vi.fn(),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.statusCode).toBe(403);
		expect(res.json).toHaveBeenCalledWith({
			error: "Forbidden: Origin not allowed",
		});
	});

	it("should return 400 if topic is missing", async () => {
		vi.mocked(handleFeedbackPromptsRequest).mockImplementation((_, res) => {
			res.status(400).json({
				error: "Topic is required and must be a non-empty string.",
			});
		});

		const req = {
			method: "POST",
			headers: { origin: process.env.FRONTEND_URL },
			body: {},
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			json: vi.fn(),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "Topic is required and must be a non-empty string.",
		});
	});

	it("should return 400 if topic is empty", async () => {
		vi.mocked(handleFeedbackPromptsRequest).mockImplementation((_, res) => {
			res.status(400).json({
				error: "Topic is required and must be a non-empty string.",
			});
		});

		const req = {
			method: "POST",
			headers: { origin: process.env.FRONTEND_URL },
			body: { topic: "     " },
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			json: vi.fn(),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "Topic is required and must be a non-empty string.",
		});
	});

	it("should return 500 if handleFeedbackPromptsRequest throws an error", async () => {
		vi.mocked(handleFeedbackPromptsRequest).mockImplementation((_, res) => {
			res.status(500).json({
				error: "Failed to generate prompts due to an internal error.",
			});
		});

		const req = {
			method: "POST",
			headers: { origin: process.env.FRONTEND_URL },
			body: { topic: "test topic" },
		};

		const res = {
			statusCode: 0,
			status: vi.fn((code) => {
				res.statusCode = code;
				return res;
			}),
			headers: {},
			setHeader: vi.fn((key, value) => {
				res.headers[key] = value;
			}),
			json: vi.fn(),
			end: vi.fn(),
		};

		await handler(req, res);

		expect(res.statusCode).toBe(500);
		expect(res.json).toHaveBeenCalledWith({
			error: "Failed to generate prompts due to an internal error.",
		});
	});
});
