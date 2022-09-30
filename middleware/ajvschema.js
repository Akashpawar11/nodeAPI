module.exports.userSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" ,pattern: "^\\S+@\\S+\\.\\S+$",},
        contact: { type: "number", minLength: 10 },
        role: { type: "string" },
    },
    required: ["id", "name", "email", "contact", "role"],
};


