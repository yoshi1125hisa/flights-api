const express = require('express');
const app = express();

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