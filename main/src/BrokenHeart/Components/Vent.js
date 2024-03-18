import React, { useState } from 'react'
import '../BrokenHeart.css';

function Vent() {
    const [ventInput, setVentInput] = useState('');
    const [gptResponse, setGptResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setVentInput(event.target.value);
    }

    function clearResponse() {
        setGptResponse(null);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            let data = null;
            const response = await fetch("http://localhost:5000/alter-thought", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vent: ventInput })
            })
            .then(response => response.json())
            .then(data => {
                setGptResponse(JSON.parse(data.message));
                setIsLoading(false);
            });
        }
        catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="input-container">
                <input className='input-box' type="text" value={ventInput} onChange={handleInputChange} placeholder="Type your vent here..." />
                <button className="ssl modern-button" onClick={handleSubmit}>Check for cognitive distortions</button>
            </div>
            {gptResponse && (
                <div className="button-container">
                    <button className="modern-button clear-button" onClick={clearResponse}>Clear</button>
                </div>
            )}
            {isLoading ? (
                <p>Loading...</p> // display a loading message if isLoading is true
            ) : (
                <>
                    {gptResponse && (
                    <>
                    <p>Original Thought: {ventInput}</p>
                    <p>Alternative thoughts:</p>
                    <ul>
                        {gptResponse && gptResponse.alternative_thoughts.map((thought, index) => (
                            <li key={index}>{thought}</li>
                        ))}
                    </ul>
                    <p>Cognitive distortions: </p>
                    <ul>
                        {gptResponse && gptResponse.cognitive_distortion.map((distortion, index) => (
                            <li key={index}>{distortion}</li>
                        ))}
                    </ul>
                    <p>Explanation of cognitive distortions: </p>
                    <ul>
                        {gptResponse && gptResponse.cognitive_distortion_explanations.map((explanation, index) => (
                            <li key={index}>{explanation}</li>
                        ))}
                    </ul>
                    <p>Consider their side:</p>
                    <ul>
                        {gptResponse && gptResponse.consider_their_side.map((side, index) => (
                            <li key={index}>{side}</li>
                        ))}
                    </ul>
                    <p>Next steps:</p>
                        <ul>
                        {gptResponse && gptResponse.next_steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                    <p>Next steps in the next hour:</p>
                    <ul>
                        {gptResponse && gptResponse.next_steps_hour.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                    <p>Next steps in the next day:</p>
                    <ul>
                        {gptResponse && gptResponse.next_steps_day.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                    <p>Next steps in the next month:</p>
                    <ul>
                        {gptResponse && gptResponse.next_steps_month.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                    </>

                )}
                </>
            )}
        </div>
    )
}

export default Vent