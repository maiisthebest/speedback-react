import { useState } from "react";
import "./PromptGenerator.css";

const PromptGenerator = () => {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;

	const [topic, setTopic] = useState("");
	const [prompts, setPrompts] = useState<string[]>([]);
	const [isExpanded, setIsExpanded] = useState(false); // New state for accordion

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
		<div
			className={`prompt-generator-accordion ${isExpanded ? "expanded" : "collapsed"}`}
		>
			<button
				className="accordion-header"
				onClick={() => setIsExpanded(!isExpanded)}
				type="button"
			>
				<h3>💡 Need help coming up with feedback prompts?</h3>
				<span className="accordion-icon">{isExpanded ? "▾" : "▸"}</span>
			</button>

			<div className="accordion-content">
				<p className="prompt-helper-text">
					Giving feedback doesn’t have to be hard. Type a topic like
					communication, leadership, or problem solving and our AI
					will help generate some feedback prompts to guide your
					conversation.
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
						placeholder="Topic e.g. communication, leadership, problem solving"
						onChange={(e) => setTopic(e.target.value)}
						value={topic}
					/>
					<button type="submit">Generate</button>
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
		</div>
	);
};

export default PromptGenerator;
