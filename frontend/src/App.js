import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
