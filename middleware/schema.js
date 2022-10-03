module.exports.a = 
{
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "default": {},
    "title": "Root Schema",
    "required": [
        "id",
        "name",
        "email",
        "contact",
        "role"
    ],
    "properties": {
        "data": {
            "type": "array",
            "default": [],
            "title": "The data Schema",
            "items": {
                "type": "array",
                "default": {},
                "title": "A Schema",
                "required": [
                    "id",
                    "name",
                    "email",
                    "contact",
                    "role"
                ],
                "properties": {
                    "id": {
                        "type": "integer",
                        "default": 0,
                        "title": "The id Schema",
                        "examples": [
                            1
                        ]
                    },
                    "name": {
                        "type": "string",
                        "default": "",
                        "title": "The name Schema",
                        "examples": [
                            "A green door"
                        ]
                    },
                    "email": {
                        "description": "Email of the user",
                        "type": "string",
                        "format": "email"
                    },
                    "contact": {
                        "type": "number",
                        "default": 0,
                        "title": "The contact Schema",
                        "minLength": 10,
                        "maxLength": 15,
                        "examples": [
                            2345673452
                        ]
                    },
                    "role": {
                        "type": "string",
                        "default": "",
                        "title": "The role Schema",
                        "examples": [
                            "md"
                        ]
                    }
                },
                "examples": [
                    {
                        "id": 1,
                        "name": "A green door",
                        "email": "greendoor@gmail.com",
                        "contact": 2345673452,
                        "role": "md"
                    }
                ]
            },
            "examples": [
                [
                    {
                        "id": 1,
                        "name": "A green door",
                        "email": "greendoor@gmail.com",
                        "contact": 2345673452,
                        "role": "md"
                    }
                ]
            ]
        }
    }
}