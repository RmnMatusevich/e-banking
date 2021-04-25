const moment = require('moment');

module.exports = (error, req, res, next) => {
    res.locals.trace = {
        date: Date.now(),
        url: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        cookies: req.cookies
    };

    console.error('Error');
    console.error(moment().format('HH:mm:ss'));
    console.error(`${req.method} ${req.path}`);
    console.error(JSON.stringify(req.query));
    console.error(JSON.stringify(req.body));
    console.error();

    res.error(error);
};