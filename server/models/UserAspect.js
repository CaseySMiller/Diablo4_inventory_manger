const { Schema } = require("mongoose");
const { parseOut } = require("../utils/parseDescription");


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
        type: [String],
    },
    itemType: {    
        type: [String]
        // add check for valid item type
    },
});

userAspectSchema.virtual('userAspectDescription').get(function () {
    return parseOut(this.description, [stats]);
});


module.exports = userAspectSchema;
