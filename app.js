const express = require('express');
const courseTitleMap = require('./data/course_title_map.json');

const app = express();

app.get('/course_title_map', (req, res) => {
    res.status(200).send({
        status: 'success',
        data: courseTitleMap
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
})