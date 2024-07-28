import { getGoalsAndAI } from '../services/MoNature.js';

const chatController = async (req, res) => {
  try {
    let context = [
      {
        role: 'system',
        content: 'You are an AI Sustainable Development Goals (SDG) bot. You can help me with information on the Sustainable Development Goals and you also help to give information on the events which are on the system.'
      }
    ];

    const userMessage = req.body.message;
    context.push({
      role: 'user',
      content: userMessage
    });

    let aiResponse = await getGoalsAndAI(context);
    context.push(aiResponse);

    // Keep interacting until a final answer is provided
    while (aiResponse.finish_reason === 'tool_calls') {
      const userNextMessage = req.body.message;
      context.push({
        role: 'user',
        content: userNextMessage
      });

      aiResponse = await getGoalsAndAI(context);
      context.push(aiResponse);
    }

    res.json({ response: aiResponse.content });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred during the chat interaction.' });
  }
};

export default chatController;
