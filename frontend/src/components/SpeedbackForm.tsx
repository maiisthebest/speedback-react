import "./SpeedbackForm.css";
import PromptGenerator from "./PromptGenerator";
import RoundGenerator from "./RoundGenerator";

const SpeedbackForm = () => {
	return (
		<div className="speedback-form">
			<h2>Speedback</h2>
			<p>
				Quickly pair up your team for fun, speed-dating style feedback
				rounds. Just add names and let the magic happen ⚡️
			</p>

			<PromptGenerator />
			<RoundGenerator />
		</div>
	);
};

export default SpeedbackForm;
