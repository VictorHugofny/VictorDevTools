import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './componentes/Navbar';
import ConversorCSV from './views/conversorCSV';
import GerarSenhas from './views/geradorSenhas';

function RoutesAPP(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ConversorCSV/>}/>
                <Route path="/senhas" element={<GerarSenhas/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesAPP;