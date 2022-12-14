import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { simpleGet } from '../services/simpleGet';
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';

const MisLibros = () => {

    const [books, setBooks] = useState();
    const [interesados, setInteresados] = useState();
    const [allUsers, setAllUsers] = useState();
    const {id} = useParams();
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const getBooks = async()=>{
        try{
            const response = await simpleGet(`/api/books/${id}`)
            console.log(response.data.books)
            setBooks(response.data.books);
            
        }catch(err){
            console.log(err)
        }
    };
    const getAllBooks = async() =>{
        try{
            const response = await simpleGet('/api/all-books')
            console.log(response.data.books)
            
            setInteresados(response.data.books.filter(book=>user.interesados.includes(book._id)));
            
        }catch(err){
            console.log(err)
        }
    };

    const getUsers = async()=>{
        try{
            const response = await simpleGetAuthenticated('/api/users')
            console.log(response)
            setAllUsers(response.data);
            
            
            
        }catch(err){
            console.log(err)
        }
    }

    const renderSolicitados = (book) =>{
        const aux = allUsers?.map(user=> user.interesados).map(libro=>libro.includes(book._id))
        console.log (aux)
        
        if(aux){
            if(aux.includes(true)){

                return(<><button onClick={()=>navigate(`/solicitado/${book._id}`)}>Solicitado</button></>)

            }


           
        }
    }

    useEffect(() => {
        getBooks();
        getAllBooks();
        getUsers();
    }, []);

    return (
        <div>
            <h2>Mis libros</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>
                        <th>Solicitados</th>                        
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book)=>
                    <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{renderSolicitados(book)}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <h2>Mis Solicitudes</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>                         
                    </tr>
                </thead>
                <tbody>
                    {interesados?.map((book)=>
                    <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MisLibros;
