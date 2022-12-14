import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';

const Solicitado = () => {

    
    const {id} = useParams();
    const [bookUser, setBookUser] = useState();
    const navigate = useNavigate();

    const getUsers = async()=>{
        try{
            const response = await simpleGetAuthenticated('/api/users')
            console.log(response)
            console.log(response.data.filter(user=>user.interesados.includes(id)))
            setBookUser(response.data.filter(user=>user.interesados.includes(id)));
            
        }catch(err){
            console.log(err)
        }
    }

    const renderinfo =()=>{
        const aux = bookUser?.map(user => user.books)
        console.log (aux)
        return(<><table className="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Interesado</th>
                <th>Libros</th>                        
            </tr>
        </thead>
        <tbody>
            {bookUser?.map((user)=>
            <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.books.map(book=><p className='details-interesado-btn' onClick={()=> navigate(`/detalle-interesado/${id}/${book._id}`)}>{book.title}</p>)}</td>
               
            </tr>
            )}
        </tbody>
    </table></>)
    }

    useEffect(() => {
        console.log(bookUser)
    }, [bookUser]);


    useEffect(() => {

        getUsers();
        
    }, []);
    const aux = bookUser?.map(user => user.books)
    console.log(bookUser)
    return (
        <div>
            {renderinfo()}
            
        </div>
    );
}

export default Solicitado;
