import { useState } from "react";
import "./SpeedbackForm.css";
import { generateRounds } from "./roundRobin";

const SpeedbackForm = () => {
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [rounds, setRounds] = useState<string[][]>([]);

  const handleAddParticipant = () => {
    const trimmedName = participantName.trim();

    if (!trimmedName) {
      setError("Name cannot be empty");
      return;
    }
    const newParticipants = [...participants, trimmedName];
    setParticipants(newParticipants);
    setParticipantName("");

    setRounds(generateRounds(newParticipants));
  };

  const removeParticipant = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);

    setRounds(generateRounds(newParticipants));
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

      {participants.length > 0 && (
        <div className="participants-container">
          <h3>Participants ({participants.length})</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index} className="participant-item">
                <span>{participant}</span>
                <button
                  className="btn-remove"
                  onClick={() => removeParticipant(index)}
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
          <h3>Rounds ({rounds.length})</h3>
          {rounds.map((round, roundIdx) => (
            <div key={roundIdx}>
              <h3>Round {roundIdx + 1}</h3>
              <ul>
                {round.map((match, matchIdx) => (
                  <li key={matchIdx}>{match}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedbackForm;
