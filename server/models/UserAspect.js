const { Schema } = require("mongoose");

// This is a subdocument schema, we'll use it as the schema for the User's `eAspects` and sAspects arrays in User.js
const userAspectSchema = new Schema({
    aspect: {
        type: String, ref: 'Aspect', // this should ref the _id of the Aspect
        required: true,
    },
    location: {
        type: String,
    },
    stats: {
        type: [Number],
    },
});

module.exports = userAspectSchema;
