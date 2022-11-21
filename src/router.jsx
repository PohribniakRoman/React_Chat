import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route excat path='/' element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    )
}