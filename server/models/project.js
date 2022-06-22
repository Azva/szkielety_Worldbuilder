const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    containedPersons: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }],
    containedLocations: [{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }],
    containedItems: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    containedHistoricEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'HistoricEvent'
    }]
},
{timestamps: true})

module.exports = mongoose.model('Project', projectSchema)
