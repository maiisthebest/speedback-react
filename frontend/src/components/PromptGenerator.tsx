import { useState } from "react";
import { ChevronRight } from "lucide-react";
import PromptSuggestions from "./PromptSuggestions";
import "./PromptGenerator.css";

const PromptGenerator = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`prompt-generator-accordion ${isExpanded ? "expanded" : ""}`}
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
				<PromptSuggestions />
			</div>
		</div>
	);
};

export default PromptGenerator;
