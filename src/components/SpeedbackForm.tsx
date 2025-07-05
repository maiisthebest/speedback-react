import { useEffect, useState } from "react";
import "./SpeedbackForm.css";
import { generateRounds } from "./roundRobin";
import { generateTopics } from "../services/ai";

const SpeedbackForm = () => {
	const [participantName, setParticipantName] = useState("");
	const [participants, setParticipants] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [rounds, setRounds] = useState<string[][]>([]);

	const [sessionTopic, setSessionTopic] = useState("");
	const [generatedTopics, setGeneratedTopics] = useState<string[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	useEffect(() => {
		setRounds(generateRounds(participants));
	}, [participants]);

	const handleAddParticipant = () => {
		const trimmedName = participantName.trim();

		if (!trimmedName) {
			setError("Name cannot be empty");
			return;
		}

		if (participants.includes(trimmedName)) {
			setError("Name already exists");
			return;
		}

		const newParticipants = [...participants, trimmedName];
		setParticipants(newParticipants);
		setParticipantName("");
	};

	const removeParticipant = (nameToRemove: string) => {
		setParticipants(
			participants.filter((participant) => participant !== nameToRemove),
		);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		setParticipantName(e.target.value);
	};

	const handleGenerateTopics = async () => {
		if (!sessionTopic) {
			return;
		}
		setIsGenerating(true);
		const topics = await generateTopics(sessionTopic);
		setGeneratedTopics(topics);
		setIsGenerating(false);
	};

	return (
		<div className="participant-form">
			<h2>Speedback</h2>
			<p>
				Quickly pair up your team for fun, speed-dating style feedback
				rounds. Just add names and let the magic happen ⚡️
			</p>

			<div className="participant-form-wrapper">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddParticipant();
					}}
				>
					<label
						htmlFor="participant-name-input"
						className="visually-hidden"
					>
						Participant Name
					</label>
					<input
						id="participant-name-input"
						type="text"
						placeholder="Participant Name"
						value={participantName}
						onChange={handleInputChange}
					/>
					<button type="submit">Add</button>

					{error && <p className="error-message">{error}</p>}
				</form>
			</div>

			<div className="topic-generator">
				<h3>AI Topic Generator</h3>
				<p>
					Give the AI a theme, and it will generate some conversation
					starters for your session.
				</p>
				<div className="topic-form-wrapper">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleGenerateTopics();
						}}
					>
						<label
							htmlFor="session-topic-input"
							className="visually-hidden"
						>
							Session Topic
						</label>
						<input
							id="session-topic-input"
							type="text"
							placeholder="E.g., Project Kick-off"
							value={sessionTopic}
							onChange={(e) => setSessionTopic(e.target.value)}
						/>
						<button type="submit" disabled={isGenerating}>
							{isGenerating ? "Generating..." : "Generate"}
						</button>
					</form>
				</div>
				{isGenerating && <p>Generating topics...</p>}
				{generatedTopics.length > 0 && (
					<div className="generated-topics-container">
						<h4 className="container-title">Generated Topics</h4>
						<ul>
							{generatedTopics.map((topic, index) => (
								<li key={index} className="topic-item">
									{topic}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="content-wrapper">
				{participants.length > 0 && (
					<div className="participants-container">
						<h3 className="container-title">
							Participants ({participants.length})
						</h3>
						<ul aria-live="polite">
							{participants.map((participant) => (
								<li
									key={participant}
									className="participant-item"
								>
									<span>{participant}</span>
									<button
										className="btn-remove"
										onClick={() =>
											removeParticipant(participant)
										}
										aria-label={`Remove ${participant}`}
										type="button"
									>
										x
									</button>
								</li>
							))}
						</ul>
					</div>
				)}

				{rounds.length > 0 && (
					<div className="rounds-container">
						<h3 className="container-title">
							Rounds ({rounds.length})
						</h3>
						{rounds.map((round, roundIdx) => (
							<div key={roundIdx} className="round">
								<h4>Round {roundIdx + 1}</h4>
								<ul>
									{round.map((match, matchIdx) => (
										<li
											key={matchIdx}
											className="match-item"
										>
											{match}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SpeedbackForm;
