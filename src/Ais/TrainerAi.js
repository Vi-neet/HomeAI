import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of equipment, workout preferences, available days, and desired workout duration from a user and suggests a workout routine they could follow. You don't need to use every item they mention in your routine. The routine can include additional exercises or equipment they didn't mention, but try not to include too many extra items. Format your response in markdown to make it easier to render to a web page.
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getWorkoutRoutineFromMistral(detailsArr) {
  const detailsString = detailsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${detailsString}. Please give me a workout routine you'd recommend I follow!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}