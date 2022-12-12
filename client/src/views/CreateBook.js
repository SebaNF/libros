import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { simplePost } from '../services/simplePost';
import BookForm from "../components/BookForm"

const CreateBook = () => {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {user, setUser} = useUser();

    const createBook = async(values) =>{
        values = {...values, idUser:user._id}

        const response = await simplePost('/api/book',values)
        console.log(values)
        if(response.data.message !== ""){
            console.log("ERRORES", response.data);
            const errorResponse = response.data.errors;
            console.log("Object keys", Object.keys(errorResponse));
            const errorArr = [];
        for (const llave of Object.keys(errorResponse)) {
            console.log(errorResponse[llave]);
            errorArr.push(errorResponse[llave].message);
        }
        setErrors(errorArr);
        }else{

            navigate('/')
        }
    }


    return (
        <div>
            <div className='header'>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/')}>Volver a Home</button>
            </div>
            <h2>Agregar Libro</h2>
            <div className='form-error-div'>
                <BookForm title="" author="" genre="" onSubmitProp={createBook}/>
                {errors?.map((error,index)=><p className='error-validation2' key={index}>{error}</p>)}
            </div>
        </div>
    );
}

export default CreateBook;