import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Home from './components/Home';
import Room from './components/Room';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='React_Chat/:roomId' element={<Room/>}/>
                <Route excat path='React_Chat/' element={<Home/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}