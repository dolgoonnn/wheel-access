import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key
  dangerouslyAllowBrowser: true
});