// Example using fetch; replace with actual Google GenAI SDK usage if not using a backend
export async function getTopicSuggestions(topic: string): Promise<string[]> {
	// Replace this with your actual backend endpoint
	const response = await fetch("/api/genai-suggestions", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ topic }),
	});
	if (!response.ok) throw new Error("API error");
	const data = await response.json();
	return data.suggestions; // Should be an array of strings
}
