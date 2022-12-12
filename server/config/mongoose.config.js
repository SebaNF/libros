const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/libros', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("BASES DE DATOS OPERACIONAL"))
	.catch(err => console.log("Algo salió mal", err));