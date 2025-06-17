import { useState } from "react";
import "./ParticipantForm.css";

const ParticipantForm = () => {
	const [participantName, setParticipantName] = useState("");
	const [participants, setParticipants] = useState<string[]>([]);
	const [error, setError] = useState("");

	const handleAddParticipant = () => {
		const trimmedName = participantName.trim();

		if (!trimmedName) {
			setError("Name cannot be empty");
			return;
		}

		setParticipants([...participants, trimmedName]);
		setParticipantName("");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		setParticipantName(e.target.value);
	};

	return (
		<div className="participant-form">
			<h2>Add Participants</h2>

			<div className="participant-form-input">
				<form
					onSubmit={(e) => {
						e.preventDefault();

						handleAddParticipant();
					}}
				>
					<input
						type="text"
						placeholder="Participant Name"
						value={participantName}
						onChange={handleInputChange}
					/>
					<button type="submit">Add</button>

					{error && <p className="error-message">{error}</p>}
				</form>
			</div>
			<ul>
				{participants.map((participant, index) => (
					<li key={index}>{participant}</li>
				))}
			</ul>
		</div>
	);
};

export default ParticipantForm;
