import React, { useState } from 'react';
import '../BrokenHeart.css';

const CopeAhead = () => {
    const [input, setInput] = useState('');
    const [gptResponse, setGptResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        setGptResponse(null);
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/cope-ahead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input })
            });
            const data = await res.json();
            setGptResponse(data.message);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const clearResponse = () => {
        setGptResponse(null);
    };

    return (
        <div>
            <div className="input-container">
                <textarea className='input-box' type="text" value={input} onChange={handleChange} placeholder="Type your scenario here..." />
                <button className="ssl modern-button" onClick={handleSubmit}>Write a cope ahead script</button>
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
                        {gptResponse}
                    </>

                )}
                </>
            )}
        </div>
    );
};

export default CopeAhead;