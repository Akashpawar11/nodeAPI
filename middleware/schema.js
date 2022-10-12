module.exports.userSchema = {
    $schema : "http://json-schema.org/draft-06/schema#",
    $id: "http://example.com/example.json",
    type: "arrays",
    default: {},
    title: "Root Schema",
    required: [
        "id",
        "name",
        "email",
        "contact",
        "role"
    ],
    properties:
    {
        id: {
            type: "integer",
            default: 0,
            title: "The id Schema"
        },
        name: {
            type: "string",
            default: "",
            title: "The name Schema"
        },
        email: {
            description: "Email of the user",
            type: "string",
            format: "email",
            minLength: 5,
            maxLength: 50
        },
        contact: {
            type: "number",
            title: "The contact Schema",
            minimum: 1000000000,
            maximum: 9999999999
        },
        role: {
            type: "string",
            default: "",
            title: "The role Schema",
        }
    }
}