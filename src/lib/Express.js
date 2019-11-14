const express = require('express');
const cors = require('cors')
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

app.set('port', (process.env.PORT || 3000));
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

module.exports = requests => {
    app.get('/', (req, res) =>
        res.send('This API is working!')
    );
    app.get('/v1/flights', (req, res) =>
        res.send(requests),
    );
    app.listen(app.get('port'), function () {
        console.log("Node app is running at localhost:" + app.get('port'))
    });
}
