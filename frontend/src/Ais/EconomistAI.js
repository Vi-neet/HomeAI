import {CohereClientV2} from "cohere-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of expenses, incomes and savings(all in INR)
 that a user has and suggests a budget they could make with some or all of those metrices. 
 You don't need to use every metrics they mention in your budget. 
 The budget can include additional metrices they didn't mention, but try not to include too many extra metrices.
   Always generate accurate response and descriptive budget.No 1 word answers.
  Format your response(in english) in markdown to make it easier to render to a web page
`;

// Initialize the client with your API key
const cohere = new CohereClientV2({
  token: import.meta.env.VITE_HF_ACCESS_TOKEN
});

export async function getBudgetFromMistral(itemsArr) {
  const itemsString = itemsArr.join(", ");
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${itemsString}. Please give me a budget you'd recommend I make!`,
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