import axios from 'axios';
import cheerio from 'cheerio';

const baseUrl = 'https://sdgs.un.org';

const scrapeSDGs = async () => {
    const url = baseUrl;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const goals = [];
        $('.card.card-goal').each((index, element) => {
            const goal = {};
            goal.number = $(element).find('.goal-number').text().trim();
            goal.title = $(element).find('.goal-title').text().trim();
            goal.description = $(element).find('.goal-text').text().trim();
            goal.image = baseUrl + $(element).find('img.goal-logo').attr('src');

            const features = [];
            $(element).find('.goal-info .col-6').each((i, el) => {
                const feature = {};
                feature.number = $(el).find('.number').text().trim();
                feature.name = $(el).find('.feature').text().trim();
                features.push(feature);
            });
            goal.features = features;

            goals.push(goal);
        });

        return goals;
    } catch (error) {
        console.error('Error scraping SDGs:', error);
        throw new Error('Failed to scrape SDGs');
    }
};

export default {
    scrapeSDGs,
};
