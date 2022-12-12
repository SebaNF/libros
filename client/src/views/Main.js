import React, { useEffect, useState } from 'react';
import {useUser} from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';
import logout from '../services/logout';
import { simpleGet } from '../services/simpleGet';
import { simplePut } from '../services/simplePut';


const Main = () => {

    const {user,setUser} = useUser();
    const [books, setBooks] = useState();
    const navigate = useNavigate();
    

    const getBooks = async() =>{
        try{
            const response = await simpleGet('/api/all-books')
            console.log(response.data.books)
            setBooks(response.data.books);
            
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

   

    const logOut = async() => {
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No se pude desloguear")
    }

    const interesa = async(book) =>{
        user.interesados.push(book._id)
        setUser({...user})
        const response = await simplePut(`/api/user/${user._id}`,user);


    }

    const desInteresar = async(book) =>{
        if(user){
            user?.interesados.filter(interesado=>interesado._id!==book._id)
            setUser({...user})
            const response = await simplePut(`/api/user/${user._id}`,user);

        }
    }
    const renderBtn = (book) =>{
        if(user){
            if(user.interesados.includes(book._id)){
                return(<><button /* onClick={desInteresar(book)} */>Pendiente</button></>)
            }else{
                return(<><button type="button" className="btn btn-warning" onClick={()=>interesa(book)}>Me interesa</button></>)
            }
        }
    }
    
    return (
        <div>
            
            <div className='header'>
                <h1>libros</h1>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/create')}>Agregar Libro</button>
            </div>
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>
                        <th>Acciones</th>                         
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book)=>
                    <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>
                            <div className='actions-button'>
                                <button id="details-btn"  type="button" className="btn btn-link"onClick={()=>navigate(`/book/${book._id}`)}>Detalles</button> 
                                <button type="button" className="btn btn-link"onClick={()=>navigate(`/book/${book._id}/edit`)}>Editar</button>
                               { renderBtn(book)}
                                {/* <button type="button" className="btn btn-warning" onClick={()=>interesa(book)}>Me interesa</button> */}
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>



        </div>
    );
}

export default Main;
