const { Schema, model } = require("mongoose");

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
        whereFrom: {
            type: String,
        },
        class: {
            type: String,
            required: true,
            match: [/All|Barbarian|Druid|Sorcerer|Rogue|Necromancer/i, 'Must use a valid class name'],
        },
        defaultStats: {
            type: [Number],
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

const Aspect = model('Aspect', aspectSchema);

module.exports = Aspect;

