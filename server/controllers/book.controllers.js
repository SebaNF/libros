const { Book } = require("../models/book.model");
const {User} = require("../models/user.model");


/* module.exports.createBook= async (req, res) =>{
    try{
        const { title, author, genre, idUser} = req.body;
        const book = await Book.create({ title, author, genre, idUser});
        const user= await User.findById(idUser).exec();
        const userBooks = await User.findByIdAndUpdate(idUser).populate("books").exec();
        user.books.push(book);
        await user.save();
        res.json({message:"", book: book})

    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
}; */

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

module.exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, idUser} = req.body;
        const book = await Book.create({ title, author, genre, idUser});
        const userUpdated = await User.findByIdAndUpdate(idUser, {
            $push: {
                books: book
            }
        }, { new: true });
        

        res.json({message:"", book: book})



    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido crear el libro',
            err
        });
        console.log(err)
    }
}
module.exports.tradeBooks = async (req, res) => {
    try {
        const { idUser1, idUser2, idBook1, idBook2} = req.body;
        const user1= await User.findById(idUser1).exec();
        const user2= await User.findById(idUser2).exec();
        const array = [...user1.books] 
        array.filter(book=>{
            if(book._id!== idBook1){
                console.log('ids no calzan ')

            }
            return(book._id!== idBook1)
            
            
            
            
        
        })
        
        console.log("mensajito",array)
        user2.books.filter(book=>book._id.valueOf() !== idBook2)
        user1.interesados.filter(book=>book._id !== idBook2)
        user2.interesados.filter(book=>book._id !== idBook1)
        console.log("user 1", user1)
        console.log("book 1", idBook1)
        user1.books.forEach(book=>console.log("forEach", book._id.valueOf()))
        
        user1.update()
        user2.update()
        
        

        res.json({message:"", user:user1})



    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido crear',
            err
        });
        console.log(err)
    }
}

//guardar historial de trade