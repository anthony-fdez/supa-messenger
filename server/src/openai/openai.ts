import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-iLMVuD9Gq0ssydPa3dayp0Gs",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
