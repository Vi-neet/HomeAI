import {CohereClientV2} from "cohere-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of equipment, workout preferences,
 available days, and desired workout duration from a user and suggests a workout
  routine they could follow. You don't need to use every item they mention in your routine. 
  The routine can include additional exercises or equipment they didn't mention, 
  but try not to include too many extra items.
  Always generate accurate response and descriptive workout routine. No 1 word answers.
  Format your response(in english) in markdown to make it easier to render to a web page.
  Make sure to generate the title (i.e the very first element)in a h1 tag 
`;

// Initialize the client with your API key
const cohere = new CohereClientV2({
  token: import.meta.env.VITE_HF_ACCESS_TOKEN
});

export async function getWorkoutRoutineFromMistral(detailsArr) {
  const detailsString = detailsArr.join(", ");
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${detailsString}. Please give me a workout routine you'd recommend I follow!`,
        },
      ],
      max_tokens: 1024,
    });
    
    // Cohere response structure is different from other APIs
    console.log("Full response:", response);
    
    // Extract text from the Cohere response - which is a string
    const content = response.message.content[0].text;
    
    console.log("Extracted content:", content);
    return content; // Return the string directly
  } catch (err) {
    console.error("Error details:", err);
    throw err; // Re-throw to see the full error in the console
  }
}