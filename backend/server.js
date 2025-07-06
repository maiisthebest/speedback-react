const express = require("express");
const generatePrompts = require("./generatePrompts");

const app = express();
app.use(express.json());
const port = 3000;

app.post("/api/feedback-prompts", async (req, res) => {
	const { topic } = req.body;

	const prompts = await generatePrompts(topic);

	res.status(200).json({ prompts });
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
