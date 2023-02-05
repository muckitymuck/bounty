import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }
  //Changed all "scene" variables to "notes"

  const notes = req.body.notes || '';
  if (notes.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter some notes for generating a cover letter",
      }
    });
    return;
  }

  try {
    const temperature = Number(req.body.temperature) || 0.5;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(notes),
      max_tokens: 200,
      //temperature: 0.9,
      temperature: 0.9,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(notes) {

  let prompt = `You are a very helpful, confident job seeker. You are writing Cover Letters based on notes gathered about a Job.  These may include Job Description, location, company information, or potential coworker information.`

  return prompt;
}

