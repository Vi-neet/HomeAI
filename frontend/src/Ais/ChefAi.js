// Hugging Face API Integration
import {CohereClientV2} from "cohere-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe
 they could make with some or all of those ingredients. You don't need to use every ingredient they 
 mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not 
 to include too many extra ingredients.
   Always generate accurate response and descriptive recipe.No 1 word answers.
 Format your response (in english) in markdown to make it easier to render to a web page
`;

// Initialize the client with your API key
const cohere = new CohereClientV2({
  token: import.meta.env.VITE_HF_ACCESS_TOKEN
});

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
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