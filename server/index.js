import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import authRoutes from './routes/Auth.js';
import categoryRoutes from './routes/Category.js';
import communityGroupRoutes from './routes/CommunityGroup.js';
import forumPostRoutes from './routes/Post.js';
import goalsRoutes from './routes/Goals.js';
import imageRoute from './routes/Image.js';
import eventRoute from './routes/Event.js';
import donationRoutes from './routes/Donation.js';
import config from './config/index.js';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Monature API',
            version: '1.0.0',
            description: 'API Documentation for the Monature application',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api/community-groups', communityGroupRoutes);
app.use('/api/forum-posts', forumPostRoutes);
app.use('/api/image', imageRoute);
app.use('/api/goals', goalsRoutes); 
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
