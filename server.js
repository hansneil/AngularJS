var express = require('express'),
    app = express();
app.use('/', express.static('./static'));
app.use('/images', express.static('./images'));
app.use('/lib', express.static('./lib'));
app.listen(80);