import { useState } from "react"

const ParticipantForm = () => {
    const [participantName, setParticipantName] = useState("")
    const [participants, setParticipants] = useState<string[]>([])

    const handleAddParticipant=()=>{
        setParticipants([...participants, participantName])
        setParticipantName("")
    }

    return (

    <div className="participant-form">
        <h2>Add Participants</h2>

        <div className="participant-form-input">
            <input type="text" placeholder="Participant Name" value={participantName} onChange={e=>setParticipantName(e.target.value)}/>
            <button type="button" onClick={handleAddParticipant}>Add</button>
                
        </div>
        <ul>
            {participants.map((participant, index)=>(
                <li key={index}>{participant}</li>
            ))}
        </ul>
    </div>
    )
}

export default ParticipantForm