const UserController = require("./controllers/user.controller")
const authenticate = require("./config/authenticate");
const { createBook, getBooks, getOneBook, updateBook, deleteBook, getAllBooks } = require("./controllers/Book.controllers");

module.exports = function(app){

    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);

    app.post('/api/book', createBook);
    app.get('/api/books/:idUser', getBooks);
    app.get('/api/all-books/', getAllBooks);
    app.get('/api/book/:id', getOneBook);
    app.put('/api/book/:id',updateBook);
    app.delete('/api/book/:id', deleteBook);

    //ENDPOINTS QUE NECESITAN AUTENTICACION
    app.get("/api/users",authenticate, UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser)
    app.put("/api/user/:id",UserController.putUser)
}