const { Schema, model } = require("mongoose");
const { parseOut, parseIn } = require("../utils/parseDescription");

const aspectSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            match: [/Offensive|Defensive|Utility|Resource/i, 'Must use a valid aspect type'],
        },
        defaultStats: {
            type: [String],
        },
        whereFrom: {
            type: String,
        },
        class: {
            type: String,
            required: true,
            match: [/All|Barbarian|Druid|Sorcerer|Rogue|Necromancer/i, 'Must use a valid class name'],
        },
        seasonal: {
            type: Boolean,
            default: false,
        },
        deprecated: {
            type: Boolean,
            default: false,
        },

    },
    // set this to use virtual below
    {
        toJSON: {
        virtuals: true,
        },
    }
);

// parse description before entering into db
aspectSchema.pre('validate', async function (next) {
    if (this.isNew || this.isModified('description')) {
        // console.log('applying middleware');
        this.description = parseIn(this.description);
        // console.log('in the if!!!');
    };
    next();
});

// parse description before sending to client
aspectSchema.virtual('defaultDescription').get(function () {
    return parseOut(this.description, [defaultStats]);
});

const Aspect = model('Aspect', aspectSchema);

module.exports = Aspect;

