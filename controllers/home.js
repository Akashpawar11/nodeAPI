exports.home = (req, res) => {
    return res.send(homeContent)
};

const homeContent = [{ message: 'Hello...This api is created using express and mysql' },
{ paths: "/users" }]