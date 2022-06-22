const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const locationSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    closeTo: {
        required: false,
        type: String
    },
    notes: {
        required: false,
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model('Location', locationSchema)
