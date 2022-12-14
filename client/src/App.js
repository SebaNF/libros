import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import CreateBook from "./views/CreateBook"
import NavBar from "./components/NavBar";
import MisLibros from "./views/MisLibros";
import Solicitado from "./views/Solicitado";
import DetalleInteresado from "./views/DetalleInteresado";
import Tradeo from "./views/Tradeo";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <NavBar/>
        

        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create" element={<CreateBook/>}></Route>
          <Route path="/my-books/:id" element={<MisLibros/>}></Route>
          <Route path="/solicitado/:id" element={<Solicitado/>}></Route>
          <Route path="/detalle-interesado/:id1/:id2" element={<DetalleInteresado/>}></Route>
          <Route path="/tradeo/:id1/:id2" element={<Tradeo/>}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
