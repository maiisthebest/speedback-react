import express from "express";
import generatePrompts from "./generatePrompts.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

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
