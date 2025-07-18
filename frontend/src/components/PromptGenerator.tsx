import { useState } from "react";

const PromptGenerator = () => {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;

	const [topic, setTopic] = useState("");
	const [prompts, setPrompts] = useState<string[]>([]);

	const handleSuggestPrompts = async () => {
		try {
			const res = await fetch(`${baseUrl}/api/feedback-prompts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ topic }),
			});

			const data = await res.json();
			setPrompts(data.prompts);
		} catch (error) {
			console.error("Error generating prompts:", error);
		}
	};

	return (
		<div className="prompt-generator-form-wrapper">
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
					onChange={(e) => setTopic(e.target.value)}
					value={topic}
				/>
				<button type="submit">Suggest</button>
			</form>

			{prompts.length > 0 && (
				<div className="prompts-list">
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

export default PromptGenerator;
