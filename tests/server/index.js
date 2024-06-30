const express = require('express');
const { json, urlencoded } = require('express');
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.post("/", (req, res) => {
    console.log(req.body);
    res.json({
        recived: JSON.stringify(req.body)
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});