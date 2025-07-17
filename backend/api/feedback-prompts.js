import { handleFeedbackPromptsRequest } from "../src/requestHandlers/handleFeedbackPromptsRequest.js";

const allowedOrigins = [process.env.FRONTEND_URL];

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

	await handleFeedbackPromptsRequest(req, res);
}
