import "./SpeedbackForm.css";
import PromptGenerator from "./PromptGenerator";
import RoundGenerator from "./RoundGenerator";

const SpeedbackForm = () => {
	return (
		<div className="speedback-form">
			<h2>Speedback</h2>
			<p>
				A fun way to generate fast feedback rounds for your team. Just
				add names, and we’ll handle the rest ⚡️
			</p>

			<RoundGenerator />
			<section>
				<PromptGenerator />
			</section>
		</div>
	);
};

export default SpeedbackForm;
