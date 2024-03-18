import React, { useState } from 'react';
import BrokenHeart from '../BrokenHeart';

function Communication() {
    const [communicationInput, setCommunicationInput] = useState('');
    const [gptResponse, setGptResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setCommunicationInput(event.target.value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        console.log({communicationInput});
        let data = null;
        try {
            const response = await fetch("http://localhost:5000/communicate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: communicationInput })
            })
            .then(response => response.json())
            .then(data => {
                setGptResponse(JSON.parse(data.message));
                setIsLoading(false);
            });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const clearResponse = () => {
        setGptResponse(null);
    }

    return (
        <div>
            <div className="input-container">
                <input className='input-box' type="text" value={communicationInput} onChange={handleInputChange} placeholder="Type your communication here..." />
                <button className="ssl modern-button" onClick={handleSubmit}>Help communicating</button>
            </div>
            {gptResponse && (
                <div className="button-container">
                    <button className="modern-button clear-button" onClick={clearResponse}>Clear</button>
                </div>
            )}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {gptResponse && (
                    <>
                        <p>Need help communicating with: {communicationInput}</p>
                        <p>Suggested Communication:</p>
                        <ul>
                            {gptResponse.suggested_communication.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                        <p>Suggested DEARMAN:</p>
                        <ul>
                            {gptResponse && gptResponse.suggested_dear_man.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                        <p>Suggested GIVE:</p>
                        <ul>
                            {gptResponse && gptResponse.suggested_give.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul> 
                        <p>Suggested Questions:</p>
                        <ul>
                            {gptResponse && gptResponse.suggested_questions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul> 
                    </>
                    )}
                </>
            )}
        </div>
    )
}

export default Communication;