module.exports.userSchema = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "arrays",
    "default": {},
    "title": "Root Schema",
    "required": [
        "id",
        "name",
        "email",
        "contact",
        "role"
    ],
    "properties":
    {
        "id": {
            "type": "integer",
            "default": 0,
            "title": "The id Schema"
        },
        "name": {
            "type": "string",
            "default": "",
            "title": "The name Schema"
        },
        "email": {
            "description": "Email of the user",
            "type": "string",
            "format": "email",
            "minLength": 7,
            "maxLength": 127,
        },
        "contact": {
            "type": "number",
            "title": "The contact Schema",
            "minimum": 1111111111,
            "maximum": 999999999999,
            
        },
        "role": {
            "type": "string",
            "default": "",
            "title": "The role Schema",
        }
    }
}