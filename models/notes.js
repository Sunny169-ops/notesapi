const mongoose = require('mongoose');
let notesSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String
});

module.exports =mongoose.model('notes',notesSchema)