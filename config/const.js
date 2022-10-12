module.exports = {
    homeContent: { message: 'Hello...This api is created using express and mysql', paths: "/users" },
    message: (msg) => {
        return msg.property + '-' + msg.instance + '-' + msg.message
    }
}