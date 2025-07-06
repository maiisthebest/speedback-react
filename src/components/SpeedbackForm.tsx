import { useEffect, useState } from "react";
import "./SpeedbackForm.css";
import { generateRounds } from "./roundRobin";
import { getTopicSuggestions } from "../utils/genai"; // <-- Import the helper function

const SpeedbackForm = () => {
	const [participantName, setParticipantName] = useState("");
	const [participants, setParticipants] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [rounds, setRounds] = useState<string[][]>([]);

	// New state for topic suggestions
	const [topic, setTopic] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [loadingSuggestions, setLoadingSuggestions] = useState(false);
	const [suggestionError, setSuggestionError] = useState("");

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

	// New function to fetch topic suggestions
	const handleFetchSuggestions = async () => {
		setLoadingSuggestions(true);
		setSuggestionError("");
		try {
			const result = await getTopicSuggestions(topic);
			setSuggestions(result);
		} catch (_err) {
			setSuggestionError("Failed to fetch suggestions.");
		} finally {
			setLoadingSuggestions(false);
		}
	};

	return (
		<div className="participant-form">
			<h2>Speedback</h2>
			<p>
				Quickly pair up your team for fun, speed-dating style feedback
				rounds. Just add names and let the magic happen ⚡️
			</p>

			{/* Topic input and suggestions */}
			<div className="topic-form-wrapper">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleFetchSuggestions();
					}}
				>
					<label htmlFor="topic-input" className="visually-hidden">
						Feedback Topic
					</label>
					<input
						id="topic-input"
						type="text"
						placeholder="Enter feedback topic"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					/>
					<button type="submit" disabled={loadingSuggestions}>
						{loadingSuggestions ? "Loading..." : "Get Suggestions"}
					</button>
				</form>
				{suggestionError && (
					<p className="error-message">{suggestionError}</p>
				)}
				{suggestions.length > 0 && (
					<div className="suggestions-container">
						<h4>Suggested Topics</h4>
						<ul>
							{suggestions.map((s, i) => (
								<li key={i}>{s}</li>
							))}
						</ul>
					</div>
				)}
			</div>

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
