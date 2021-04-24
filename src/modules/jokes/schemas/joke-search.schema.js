const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId },
    query: {
        type: String
    },
    results: {
        total: {
            type: Number
        },
        data: [{
            categories: [{
                type: String
            }],
            created_at: {
                type: Date
            },
            icon_url: {
                type: String
            },
            id: {
                type: String
            },
            updated_at: {
                type: Date
            },
            url: {
                type: String
            },
            value: {
                type: String
            }
        }]
    }
});

module.exports = mongoose.model('JokeSearches', schema);