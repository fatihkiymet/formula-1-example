const express = require('express');
const compression = require("compression");
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();

process.on('uncaughtException', (error) => {
    console.log('Process uncaught exception : ' + error.message);
    console.log(error.stack);
});

process.on('unhandledRejection', (reason, p) => {
    console.log("Process unhandled rejection : ", p, " reason: ", reason);
});


app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression({
    level: 1
}));


app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

const port = process.env.PORT || 3000;
app.set('port', port);

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("index");
});

app.use('*', router);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + port);
});


