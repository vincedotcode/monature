import OpenAI from 'openai';
import goalsService from './Goals.js';
import eventService from './Event.js';

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callOpenAIWithTools(context) {
  // Configure chat tools (first openAI call)
  const response = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context,
    tools: [
      {
        type: 'function',
        function: {
          name: 'getAllEvents',
          description: 'Fetch all events from the system',
          parameters: {}
        }
      },
      {
        type: 'function',
        function: {
          name: 'getAllGoals',
          description: 'Fetch all Sustainable Development Goals',
          parameters: {}
        }
      }
    ],
    tool_choice: 'auto'
  });

  const willInvokeFunction = response.choices[0].finish_reason === 'tool_calls';
  const toolCall = response.choices[0].message.tool_calls ? response.choices[0].message.tool_calls[0] : null;

  if (willInvokeFunction && toolCall) {
    const toolName = toolCall.function.name;

    if (toolName === 'getAllEvents') {
      const events = await eventService.getAllEvents();
      const toolResponse = `Here are the events:\n${JSON.stringify(events, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'tool',
        content: toolResponse,
        tool_call_id: toolCall.id
      });
    }

    if (toolName === 'getAllGoals') {
      const goals = await goalsService.getAllGoals();
      const toolResponse = `Here are the SDG goals:\n${JSON.stringify(goals, null, 2)}`;

      context.push(response.choices[0].message);
      context.push({
        role: 'tool',
        content: toolResponse,
        tool_call_id: toolCall.id
      });
    }
  }

  const secondResponse = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: context
  });

  return secondResponse.choices[0].message;
}

export {
  callOpenAIWithTools
};
