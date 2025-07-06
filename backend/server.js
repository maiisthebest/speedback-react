import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

app.post("/api/genai-suggestions", async (req, res) => {
	const { topic } = req.body;
	if (!topic) return res.status(400).json({ error: "Missing topic" });

	try {
		const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

		const prompt = `Suggest 3–5 short and simple feedback prompts to help someone give constructive feedback to the person they were paired with during a speedback round (let's refer to as "their pair") about "${topic}". The prompts should be open-ended, encourage specific observations about the other person’s performance on this topic, and be phrased in a friendly and neutral tone. Do not include yes/no questions or any extra explanation. Return only the list of prompts.`;
		const result = await model.generateContent(prompt);
		const response = result.response;
		9;
		const responseText = response.text();

		console.log("GenAI API Response Body:", responseText);

		const suggestions =
			responseText
				?.split("\n")
				.map((s) => s.replace(/^\d+\.\s*/, "").trim())
				.filter(Boolean) || [];

		res.json({ suggestions });
	} catch (err) {
		res.status(500).json({
			error: "Failed to fetch suggestions",
			details: err.message,
		});
	}
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
