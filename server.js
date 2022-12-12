const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./server/config/mongoose.config')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes')(app); 


app.listen(8000, () => {
    console.log("Servidor Conectado con éxito",)
})