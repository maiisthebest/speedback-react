import { handleFeedbackPromptsRequest } from "../src/requestHandlers/handleFeedbackPromptsRequest.js";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const allowedOrigins = [process.env.FRONTEND_URL];

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "60 s"),
});

export default async function handler(req, res) {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	if (!allowedOrigins.includes(origin)) {
		return res.status(403).json({ error: "Forbidden: Origin not allowed" });
	}

	const ip = getClientIp(req.headers["x-forwarded-for"]);
	const { success } = await ratelimit.limit(ip);
	if (!success) {
		return res.status(429).json({ error: "Too many requests" });
	}

	await handleFeedbackPromptsRequest(req, res);
}

function getClientIp(xForwardedFor) {
	if (xForwardedFor) {
		const ips = xForwardedFor.split(",");
		return ips[0].trim();
	}
	return "unknown";
}
