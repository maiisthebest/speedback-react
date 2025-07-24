import { useEffect, useState } from "react";
import { generateRounds } from "./roundRobin";
import "./RoundGenerator.css";

const RoundGenerator = () => {
	const [participantName, setParticipantName] = useState("");
	const [participants, setParticipants] = useState<string[]>([]);
	const [participantError, setParticipantError] = useState("");
	const [rounds, setRounds] = useState<string[][]>([]);

	useEffect(() => {
		setRounds(generateRounds(participants));
	}, [participants]);

	const handleAddParticipant = () => {
		const trimmedName = participantName.trim();

		if (!trimmedName) {
			setParticipantError("Name cannot be empty");
			return;
		}

		if (participants.includes(trimmedName)) {
			setParticipantError("Name already exists");
			return;
		}

		setParticipants((prev) => [...prev, trimmedName]);
		setParticipantName("");
	};

	const removeParticipant = (nameToRemove: string) => {
		setParticipants(
			participants.filter((participant) => participant !== nameToRemove),
		);
	};

	const handleParticipantInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setParticipantError("");
		setParticipantName(e.target.value);
	};

	return (
		<>
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
						onChange={handleParticipantInputChange}
					/>
					<button type="submit">Add</button>

					{participantError && (
						<p className="error-message">{participantError}</p>
					)}
				</form>
			</div>

			<div className="content-wrapper">
				<ParticipantList
					participants={participants}
					onRemove={removeParticipant}
				/>

				<RoundList participants={participants} rounds={rounds} />
			</div>
		</>
	);
};

const ParticipantList = ({
	participants,
	onRemove,
}: {
	participants: string[];
	onRemove: (name: string) => void;
}) => {
	if (participants.length === 0) return null;

	return (
		<div className="participants-container">
			<h3 className="container-title">
				Participants ({participants.length})
			</h3>
			<ul aria-live="polite">
				{participants.map((participant) => (
					<li key={participant} className="participant-item">
						<span>{participant}</span>
						<button
							className="btn-remove"
							onClick={() => onRemove(participant)}
							aria-label={`Remove ${participant}`}
							type="button"
						>
							x
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const RoundList = ({
	participants,
	rounds,
}: {
	participants: string[];
	rounds: string[][];
}) => {
	if (participants.length === 1)
		return (
			<div className="rounds-container">
				<h3 className="container-title">Rounds (0)</h3>

				<div className="round-placeholder">
					<p>Add one more participant to generate rounds</p>
				</div>
			</div>
		);
	else if (participants.length > 1)
		return (
			<div className="rounds-container">
				<h3 className="container-title">Rounds ({rounds.length})</h3>
				{rounds.map((round, roundIdx) => (
					<div key={roundIdx} className="round">
						<h4>Round {roundIdx + 1}</h4>
						<ul>
							{round.map((match, matchIdx) => (
								<li key={matchIdx} className="match-item">
									{match}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		);

	return null;
};

export default RoundGenerator;
