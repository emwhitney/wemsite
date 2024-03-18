const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const OpenAI = require("openai")

const OPENAI_KEY='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';
const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

const ventBaseString = 
`
Format the response in a JSON object for each category. The following list is for each category with the name followed by the prompt:
alternative_thoughts: write an array of alternative thoughts inspired by DBT. Make sure the thought doesn’t have over-generalization, minimizing, maximizing,
future telling, ignoring important parts of a situation, mind reading, or emotional reasoning. 
cognitive_distortion: In an array, list the cognitive distortions at play. List from 2 to 7, but include ALL of the relevant ones.
cognitive_distortion_explanations: In an array, write an explanation of the cognitive distortions
consider_their_side: In an array, consider the other person’s side. Write out potential examples of their feelings, needs, goals, reasons, and thoughts
next_steps: In an array, give next steps a person can take to solve their problem. Explain why each step would help with the problem. 
next_steps_hour: In an array, give the steps a person can take in the next hour to solve their problem. Give very specific examples, and why each step would help with the problem. 
next_steps_day: In an array, give the steps a person can take in the next day to solve their problem. Give very specific examples, and why each step would help with the problem. 
next_steps_month: In an array, give the steps a person can take in the next month to solve their problem. Give very specific examples, and why each step would help with the problem. 
`

const communicationBaseString =
`
Format the response in a JSON object for each category. The following list is for each category with the name followed by the prompt:
suggested_communication: In an array, write out a suggested script a person can use to solve their communication problem, with specifics given the problem they input. Write a very detailed script, as if the person is there.
suggested_dear_man: In an array, write out suggestions for how the person can use DEARMAN from DBT to communicate better, with specifics given the problem they input. Write as if a detailed script, as if the person is there.
suggested_give: In an array, write out suggestions for how the person can use GIVE from DBT to communicate better, with specifics given the problem they input. Write as if a detailed script, as if the person is there.
suggested_questions: In an array, write out questions that can be asked to help the person communicate better, with specifics given the problem they input. Write as if a detailed script, as if the person is there.
`

const copeAheadBaseString =
`
In 2000 words, write out a very detailed sensory script of the person wisely handling their situation. Write as if the person is there. Allow the person to feel emotion while handling the situation. Include dialogue. Write in omniscient third person, describing both people's internal feelings.
`

const promptBaseObject = {
    'vent': ventBaseString,
    'communication': communicationBaseString,
    'cope-ahead': copeAheadBaseString,
}

function makePromptString(input, category) {
    return 'Given this ' + category + ': ' + input + '. ' + promptBaseObject[category];
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));


app.post('/alter-thought', async (req, res) => {
    if (!req.body || !req.body?.vent) {
        return res.status(400).send({ error: 'The vent property is required in the request body.' });
    }

    const ventInput = req.body.vent;

    let response;
    let prompt = makePromptString(ventInput, 'vent');
    try {
        response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
              messages: [
                { role: "user", content: prompt}
              ]  
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to fetch from OpenAI API.' });
    }

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    const data = await response;
    console.log('Data:', data);
    const message = data.choices[0].message;
    console.log(message);

    if (!data.choices || data.choices.length === 0) {
        return res.status(500).send({ error: 'OpenAI API did not return any choices.' });
    }
    res.json({ message: message.content });
});

app.post('/communicate', async (req, res) => {
    if (!req.body || !req.body?.input) {
        return res.status(400).send({ error: 'The property is required in the request body.' });
    }

    const communicationInput = req.body.input;

    let response;
    let prompt = makePromptString(communicationInput, 'communication');
    try {
        response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
              messages: [
                { role: "user", content: prompt}
              ]  
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to fetch from OpenAI API.' });
    }

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    const data = await response;
    console.log('Data:', data);
    const message = data.choices[0].message;
    console.log(message);

    if (!data.choices || data.choices.length === 0) {
        return res.status(500).send({ error: 'OpenAI API did not return any choices.' });
    }
    res.json({ message: message.content });
});

app.post('/cope-ahead', async (req, res) => {
    if (!req.body || !req.body?.input) {
        return res.status(400).send({ error: 'The property is required in the request body.' });
    }

    const copeAheadInput = req.body.input;

    let response;
    let prompt = makePromptString(copeAheadInput, 'cope-ahead');
    try {
        response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
              messages: [
                { role: "user", content: prompt}
              ]  
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to fetch from OpenAI API.' });
    }

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    const data = await response;
    console.log('Data:', data);
    const message = data.choices[0].message;
    console.log(message);

    if (!data.choices || data.choices.length === 0) {
        return res.status(500).send({ error: 'OpenAI API did not return any choices.' });
    }
    res.json({ message: message.content });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));