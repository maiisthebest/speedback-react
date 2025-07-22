import { ChevronRight } from "lucide-react";
import PromptSuggestions from "./PromptSuggestions";
import "./PromptGenerator.css";

const PromptGenerator = () => {
	return (
		<details className="prompt-generator-accordion">
			<summary className="accordion-header">
				<h3>💡 Need help preparing for the session?</h3>
				<span className="accordion-icon" aria-hidden="true">
					<ChevronRight size={20} />
				</span>
			</summary>
			<div className="accordion-content">
				<PromptSuggestions />
			</div>
		</details>
	);
};

export default PromptGenerator;
