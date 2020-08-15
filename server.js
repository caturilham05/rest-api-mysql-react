const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(Cors());

//panggil router
const routes = require('./router');
routes(app);

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3001, () => {
    console.log(`Server started on port ${3001}`);
});