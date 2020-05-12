require('dotenv').config();
const express = require('express');
require('./config/database/mongo');
require('./config/database/neo4j');
const RecommendationRouter = require('./routes/recommendation');

const app = express();

app.use('/recommendation/search', RecommendationRouter);

app.get('/', (req, res) => res.status(200).json({
    message: 'It ok.'
}));

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

