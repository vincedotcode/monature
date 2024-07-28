import { callOpenAIWithTools } from './Ai.js';

export async function getGoalsAndAI(context) {
  const initialContext = [
    {
      role: 'system',
      content: 'You are an AI Sustainable Development Goals (SDG) bot. You can help me with information on the Sustainable Development Goals and you also help to give information on the events which are on the system.'
    },
    ...context
  ];

  const response = await callOpenAIWithTools(initialContext);
  return response;
}
