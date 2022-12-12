const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Debe ingresar un nombre"],
    },
    author:{
        type: String,
        required: [true, "Debe ingresar un director"],

    },
    genre:{
        type: String,
        required: [true, "Debe ingresar género"],
    },
    idUser:{
        type:String
    }

},{timestamps:true});

const Book = mongoose.model("Book", BookSchema);

module.exports = {BookSchema,Book};