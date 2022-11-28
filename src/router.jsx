import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/:roomId' element={<Room/>}/>
                <Route excat path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}