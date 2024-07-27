import goalsService from '../services/Goals.js';

const getGoals = async (req, res) => {
    try {
        const goals = await goalsService.scrapeSDGs();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getGoals,
};
