import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';

const DetalleInteresado = () => {

    const {id2} = useParams();
    const {id1} = useParams();
    const [book, setBook] = useState();
    const navigate = useNavigate();


    const getBook = async() =>{
        try{
            const response = await simpleGet(`/api/book/${id2}`)
            console.log(response.data.book)
            setBook(response.data.book);
            
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getBook();
    }, []);

   

    return (
        <div>
            {<table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>
                        <th>Acciones</th>                         
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{book?.title}</td>
                        <td>{book?.author}</td>
                        <td>{book?.genre}</td>
                        <td><button onClick={()=>navigate(`/tradeo/${id1}/${book?._id}`)}>Tradear</button></td>
                        
                    </tr>
                </tbody>
            </table>}
        </div>
    );
}

export default DetalleInteresado;
