import { GoogleGenerativeAI } from "@google/generative-ai";

export const PROMPT_TEMPLATE = `Generate 3–5 concise prompts to help me write constructive feedback for someone I work with. The prompts should focus on the topic: "{topic}". Make each prompt open-ended (no yes/no questions). Encourage specific, actionable, and kind feedback. Return only the list of prompts.`;
export const AI_MODEL = "gemini-2.0-flash";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const generateFeedbackPrompts = async (topic) => {
	const prompt = PROMPT_TEMPLATE.replace("{topic}", topic);

	try {
		const model = genAI.getGenerativeModel({ model: AI_MODEL });
		const result = await model.generateContent(prompt);

		const responseText = await result.response.text();
		return responseText
			.split("\n")
			.map((line) => line.trim().replace(/^\*+\s*/, ""))
			.filter(Boolean);
	} catch (error) {
		throw new Error("Failed to generate prompts from GenAI: ", error);
	}
};
