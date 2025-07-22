import { useState } from "react";
import "./PromptSuggestions.css";

const PromptSuggestions = () => {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;

	const [topic, setTopic] = useState("");
	const [prompts, setPrompts] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSuggestPrompts = async () => {
		const trimmedTopic = topic.trim();

		if (!trimmedTopic) {
			setError("Topic cannot be empty");
			return;
		}

		setLoading(true);
		setError(null);
		setPrompts([]);

		try {
			const res = await fetch(`${baseUrl}/api/feedback-prompts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ topic: trimmedTopic }),
			});

			if (!res.ok) {
				const backendErrorMsg = await res.json();
				throw new Error(backendErrorMsg.error || res.statusText);
			}

			const data = await res.json();
			setPrompts(data.prompts);
		} catch (error) {
			console.error("Error generating prompts:", error);
			setError(
				"An error occurred while generating prompts. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleTopicInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTopic(e.target.value);
		setError(null);
	};

	return (
		<div className="prompt-suggestions-container">
			{loading && (
				<div className="spinner-overlay">
					<div className="spinner" />
				</div>
			)}

			<p className="prompt-helper-text">
				Giving feedback can be tricky. But it’s one of the most valuable
				gifts you can offer someone. The best feedback is actionable,
				specific, and kind. We’re here to help. Just type in a topic or
				area like collaboration or leadership and we’ll generate a few
				helpful prompts to kickstart your thinking ✨
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSuggestPrompts();
				}}
			>
				<label htmlFor="topic-input" className="visually-hidden">
					Topic
				</label>
				<input
					id="topic-input"
					type="text"
					placeholder="e.g. communication, leadership, problem solving"
					onChange={handleTopicInputChange}
					value={topic}
				/>
				<button type="submit">Generate</button>
				{error && <p className="error-message">{error}</p>}
			</form>

			{prompts.length > 0 && (
				<div className="prompts-container">
					<ul>
						{prompts.map((prompt, index) => (
							<li key={index}>{prompt}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PromptSuggestions;
