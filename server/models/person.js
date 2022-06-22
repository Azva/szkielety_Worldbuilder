const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const personSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        required: true,
        type: String
    },
    race: {
        required: true,
        type: String
    },
    classs: {
        required: true,
        type: String
    },
    age: {
        required: false,
        type: Number
    },
    personality: {
        required: false,
        type: String
    },
    special: {
        required: false,
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model('Person', personSchema)
