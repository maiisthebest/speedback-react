import express from "express";
import generatePrompts from "./generatePrompts.js";

const app = express();
app.use(express.json());
const port = 3000;

app.post("/api/feedback-prompts", async (req, res) => {
	const { topic } = req.body;
	const prompts = await generatePrompts(topic);

	res.status(200).json({ prompts });
});

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Server listening on port ${port} 🚀🚀🚀`);
	});
}

export default app;
