import generatePrompts from "./generatePrompts.js";

const allowedOrigins = ["https://mai-speedback.vercel.app/"];

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const origin = req.headers.origin;
	if (!allowedOrigins.includes(origin)) {
		return res.status(403).json({ error: "Forbidden: Origin not allowed" });
	}

	const { topic } = req.body;
	const prompts = await generatePrompts(topic);

	res.status(200).json({ prompts });
}
