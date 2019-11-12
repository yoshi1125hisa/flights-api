const express = require('express');
const cors = require('cors')
const app = express();
app.set('port', (process.env.PORT || 3000));
app.use(cors())

module.exports = requests => {
    app.get('/', (req, res) =>
        res.send('pong')
    );
    app.get('/v1/flights', (req, res) =>
        res.send(requests),
    );
    app.listen(app.get('port'), function () {
        console.log("Node app is running at localhost:" + app.get('port'))
    });
}
