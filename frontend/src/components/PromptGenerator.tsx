import { useState } from "react";
import "./PromptGenerator.css";
import { ChevronRight } from "lucide-react";

const PromptGenerator = () => {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;

	const [topic, setTopic] = useState("");
	const [prompts, setPrompts] = useState<string[]>([]);
	const [isExpanded, setIsExpanded] = useState(false);

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
				<h3>💡 Need help with giving feedback?</h3>
				<span
					className={`accordion-icon ${isExpanded ? "rotated" : ""}`}
					aria-hidden="true"
				>
					<ChevronRight size={20} />
				</span>
			</button>

			<div className="accordion-content">
				<p className="prompt-helper-text">
					Just type in a topic (like communication or problem solving)
					and our AI will suggest some questions to get you started.
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
						onChange={(e) => setTopic(e.target.value)}
						value={topic}
					/>
					<button type="submit">Suggest</button>
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
