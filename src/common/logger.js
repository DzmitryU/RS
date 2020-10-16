const monitorRequests = (req, res, next) => {
    console.log(`${new Date()}: ${req.method} ${req.url} - query params: ${JSON.stringify(req.query)} - body: ${JSON.stringify(req.body)}`);

    next();
};

module.exports = {
    monitorRequests,
};
