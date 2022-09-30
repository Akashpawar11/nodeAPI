exports.headers = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
}

