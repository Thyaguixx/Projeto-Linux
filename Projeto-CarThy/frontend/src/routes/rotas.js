import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import FormularioUser from "../Components/Formulario";
import UserList from "../Components/ListaUsuarios";
import Erro404 from "../Components/Erro404";
import Inicio from "../Components/TelaInicial";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/cadastro" element={<FormularioUser />} />
                <Route path="/lista-usuarios" element={<UserList />} />
                <Route path="/" element={<Navigate to={"/inicio"} />} />
                <Route path="*" element={<Erro404 />} />
            </Routes>
        </BrowserRouter>
    );
};