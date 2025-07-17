import { useEffect } from "react";
import SpeedbackForm from "./components/SpeedbackForm";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
	useEffect(() => {
		const testGeneratePrompts = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/feedback-prompts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ topic: "collaboration" }),
				});

				const data = await res.json();
				console.log("Generated prompts:", data);
			} catch (error) {
				console.error("Error generating prompts:", error);
			}
		};
		testGeneratePrompts();
	}, []);
	return <SpeedbackForm />;
};

export default App;
