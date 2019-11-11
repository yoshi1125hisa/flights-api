const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

module.exports = requests => {
    // ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
    app.get('/', (req, res) => 
        res.json(requests)
        // res.send(
        //     JSON.stringify(requests, undefined, 4)
        // )
    );
    app.listen(3000, () => console.log('Listening on port 3000'));
}