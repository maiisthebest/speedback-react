import {
	GoogleGenerativeAI,
	type GenerationConfig,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyBH0-asdfasdf";

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig: GenerationConfig = {
	temperature: 0.9,
	topK: 1,
	topP: 1,
	maxOutputTokens: 2048,
};

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
];

export const generateTopics = async (topic: string): Promise<string[]> => {
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash-latest",
		generationConfig,
		safetySettings,
	});

	const prompt = `Generate 3-5 engaging and thought-provoking conversation starters for a feedback session about "${topic}". The topics should be open-ended and encourage constructive discussion.`;

	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = await response.text();

		// The response will likely be a numbered or bulleted list.
		// We need to parse it into an array of strings.
		const topics = text
			.split("\n")
			.map((line) => line.trim())
			.filter(
				(line) =>
					line.length > 0 &&
					!line.startsWith("#") &&
					!line.startsWith("*"),
			)
			.map((line) => line.replace(/^\d+\.\s*/, "")); // Remove leading numbers

		return topics;
	} catch (error) {
		console.error("Error generating topics:", error);
		return [];
	}
};
