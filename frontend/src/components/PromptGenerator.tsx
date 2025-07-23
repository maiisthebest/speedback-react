import { ChevronRight } from "lucide-react";
import PromptSuggestions from "./PromptSuggestions";
import { useRef, useCallback } from "react";
import "./PromptGenerator.css";

const PromptGenerator = () => {
	const contentRef = useRef<HTMLDivElement>(null);

	const handleSummaryClick = useCallback(() => {
		setTimeout(() => {
			if (
				contentRef.current &&
				(contentRef.current.parentElement as HTMLDetailsElement)?.open
			) {
				const firstInput = contentRef.current.querySelector("input");
				if (firstInput) {
					firstInput.focus();
				}
			}
		}, 0);
	}, []);
	return (
		<details className="prompt-generator-accordion">
			<summary className="accordion-header" onClick={handleSummaryClick}>
				<h3>💡 Need help preparing for the session?</h3>
				<span className="accordion-icon" aria-hidden="true">
					<ChevronRight size={20} />
				</span>
			</summary>
			<div ref={contentRef} className="accordion-content" tabIndex={-1}>
				<PromptSuggestions />
			</div>
		</details>
	);
};

export default PromptGenerator;
