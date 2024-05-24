import { Route, Routes } from "react-router-dom";
import App from "./App";
import Pci from "./Pci";
import Token from "./Token";

function Routing() {
    return ( 
        <Routes>
            <Route index element={<App></App>}></Route>
            <Route path="/pci/:cardToken" element={<Token></Token>}></Route>
        </Routes>
     );
}

export default Routing;