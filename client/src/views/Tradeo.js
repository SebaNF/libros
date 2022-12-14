import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { simpleGet } from '../services/simpleGet'
import { simplePut } from '../services/simplePut';

const Tradeo = () => {
    const {id1} = useParams();
    const {id2} = useParams();
    const [bookUser, setBookUser] = useState();
    const [bookUserInteresado, setBookUserInteresado] = useState();
    const {user, setUser} = useUser();

    
    const getBookUser = async() =>{
        try{
            const response = await simpleGet(`/api/book/${id1}`)
            console.log(response.data.book)
            setBookUser(response.data.book);
            
        }catch(err){
            console.log(err)
        }
    };
    const getBookInteresado = async() =>{
        try{
            const response = await simpleGet(`/api/book/${id2}`)
            console.log(response.data.book)
            setBookUserInteresado(response.data.book);
            
        }catch(err){
            console.log(err)
        }
    };

    const tradeBooks = async()=>{
        try{
            const data={
                idUser1: user._id,
                idUser2: bookUserInteresado.idUser,
                idBook1: bookUser._id,
                idBook2: bookUserInteresado._id
            }
            const response = await simplePut('/api/trade-book',data)
            setUser(response.data.user)
            
            
        }catch(err){
            console.log(err)
        }

    }


    useEffect(() => {
        getBookUser();
        getBookInteresado();
    }, []);


    return (
        <div>
            <h1>Detalle del Intercambio</h1>
            <h3>Mi libro</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bookUser?.title}</td>
                        <td>{bookUser?.author}</td>
                        <td>{bookUser?.genre}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Libro a recibir</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Genero</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bookUserInteresado?.title}</td>
                        <td>{bookUserInteresado?.author}</td>
                        <td>{bookUserInteresado?.genre}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={tradeBooks}>Trade</button>
        </div>
    );
}

export default Tradeo;
