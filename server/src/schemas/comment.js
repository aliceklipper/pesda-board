const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = {
    commentSchema: ajv.compile({
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            theme: {
                type: 'string',
            },
            comment: {
                type: 'string',
                minLength: 1,
            },
        },
        required: ['name', 'theme', 'comment'],
    })
};
