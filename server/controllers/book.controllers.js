const { Book } = require("../models/book.model");
const {User} = require("../models/user.model");


module.exports.createBook= async (req, res) =>{
    try{
        const { title, author, genre, idUser} = req.body;
        const book = await Book.create({ title, author, genre, idUser});
        const user= await User.findById(idUser).exec();
        const userBooks = await User.findById(idUser).populate("books").exec();
        user.books.push(book);
        await user.save();
        res.json({message:"", book: book})

    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};

module.exports.getBooks= async (req, res) =>{
    try{
        const {idUser} = req.params;
        const user = await User.findById(idUser).populate("books").exec();
        res.json({message:"",books:user.books})
    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};

module.exports.getAllBooks = (req, res) =>{
    Book.find()
        .then((books)=>res.json({books}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};


module.exports.getOneBook = (req,res) =>{
    Book.findOne({_id:req.params.id})
        .then((book)=>res.json({book:book}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};


module.exports.updateBook = (req,res) =>{
    Book.findOneAndUpdate({_id: req.params.id},req.body,{runValidators:true, new:true})
        .then((bookEdited)=> res.json ({message:"", book:bookEdited}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.deleteBook = (req,res) =>{


    Book.deleteOne({_id: req.params.id})
        .then((result)=>res.json({result:result}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};