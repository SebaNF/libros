import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import logout from '../services/logout';
import { simplePut } from '../services/simplePut';




const NavBar = () => {
    const {user,setUser} = useUser();
    const navigate = useNavigate();
    
    

    const logOut = async() => {
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No se pude desloguear")
    }
    const renderInfo=()=>{
        if(user){
            return (<>Bienvenido: {user.firstName} {user.lastName} </>)
        }else{
            return(<>No hay usuario</>)
        }
    }

    return (
        
        <div>
            <h2>{renderInfo()} </h2>
            {user && <><button onClick={logOut}>Logout</button>
            <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
          <li>
            <Link to={`/my-books/${user._id}`}>Mis libros</Link>
          </li>
          
        </ul></>}
        {!user && <>
            <ul>
          <li>
            <Link to="/">MAIN</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/register">REGISTRO</Link>
          </li>

          
        </ul></>}
        </div>
    );
}

export default NavBar;
