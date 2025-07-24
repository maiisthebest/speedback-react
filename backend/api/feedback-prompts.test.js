import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler, { ratelimit } from "./feedback-prompts.js";
import { handleFeedbackPromptsRequest } from "../src/requestHandlers/handleFeedbackPromptsRequest.js";

vi.mock("../src/requestHandlers/handleFeedbackPromptsRequest.js");

describe("POST /feedback-prompts", () => {
	let req, res;

	beforeEach(() => {
		vi.spyOn(ratelimit, "limit").mockResolvedValue({
			success: true,
			reset: Date.now() + 60000,
		});

		req = {
			method: "POST",
			headers: { origin: process.env.FRONTEND_URL },
			body: { topic: "test topic" },
		};

		res = {
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
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return 200 and prompts for a valid POST request", async () => {
		const mockPrompts = ["Prompt 1", "Prompt 2"];
		vi.mocked(handleFeedbackPromptsRequest).mockImplementation(() => {
			res.status(200).json({ prompts: mockPrompts });
		});

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
		await handler({ ...req, method: "GET" }, res);

		expect(res.statusCode).toBe(405);
		expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
	});

	it("should return 403 for forbidden origin", async () => {
		await handler(
			{ ...req, headers: { origin: "http://evil-app.com" } },
			res,
		);

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

		await handler({ ...req, body: {} }, res);

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

		await handler({ ...req, body: { topic: "     " } }, res);

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

		await handler(req, res);

		expect(res.statusCode).toBe(500);
		expect(res.json).toHaveBeenCalledWith({
			error: "Failed to generate prompts due to an internal error.",
		});
	});

	describe("Rate limiting", () => {
		it("should allow requests when under limit", async () => {
			const mockedIp = "1.1.1.2";
			await handler(
				{
					...req,
					headers: { ...req.headers, "x-forwarded-for": mockedIp },
				},
				res,
			);

			expect(ratelimit.limit).toHaveBeenCalledWith(mockedIp);
			expect(res.statusCode).not.toBe(429);
		});

		it("should use the first IP when multiple IPs are present in x-forwarded-for", async () => {
			const mockedIp = "1.1.1.2";
			await handler(
				{
					...req,
					headers: {
						...req.headers,
						"x-forwarded-for": `${mockedIp}, 2.2.2.2, 3.3.3.3`,
					},
				},
				res,
			);

			expect(ratelimit.limit).toHaveBeenCalledWith(mockedIp);
			expect(res.statusCode).not.toBe(429);
		});

		it("should handle requests with no x-forwarded-for header (ip unknown)", async () => {
			await handler(
				{ ...req, headers: { origin: process.env.FRONTEND_URL } },
				res,
			);

			expect(ratelimit.limit).toHaveBeenCalledWith("unknown");
			expect(res.statusCode).not.toBe(429);
		});

		it("should return 429 when rate limit is exceeded", async () => {
			ratelimit.limit.mockResolvedValue({
				success: false,
				reset: Date.now() + 60000,
			});

			await handler(req, res);

			expect(res.statusCode).toBe(429);
			expect(res.json).toHaveBeenCalledWith({
				error: "Too many requests",
			});
		});
	});
});
