import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Home from './components/Home';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route excat path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}