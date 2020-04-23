const express = require('express');
const app = express();
app.get('/', (req, res) => res.status(200).json({
    message: 'It ok.'
}));

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

