import "./config.js";
import express from "express";
import cors from "cors";
import { handleFeedbackPromptsRequest } from "../requestHandlers/handleFeedbackPromptsRequest.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.post("/api/feedback-prompts", handleFeedbackPromptsRequest);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Server listening on port ${port} 🚀🚀🚀`);
	});
}

export default app;
