import Ajv from 'ajv';

const ajv = new Ajv();

export const commentsSchema = ajv.compile({
    type: 'array',
    items: {
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
            timestamp: {
                type: 'number',
            },
        },
        required: ['name', 'theme', 'comment', 'timestamp'],
    },
});
