import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of expenses , incomes and savings(all in INR) that a user has and suggests a budget they could make with some or all of those metrices. You don't need to use every metrics they mention in your budget. The budget can include additional metrices they didn't mention, but try not to include too many extra metrices. Format your response in markdown to make it easier to render to a web page
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getBudgetFromMistral(itemsArr) {
  const itemsString = itemsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${itemsString}. Please give me a budget you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    console.log(response);
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}
