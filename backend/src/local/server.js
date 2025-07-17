import "./config.js";
import express from "express";
import handleFeedbackPrompts from "../handleFeedbackPrompts.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.post("/api/feedback-prompts", async (req, res) => {
	const { topic } = req.body;
	const prompts = await handleFeedbackPrompts(topic);

	res.status(200).json({ prompts });
});

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Server listening on port ${port} 🚀🚀🚀`);
	});
}

export default app;
