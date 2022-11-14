import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../features/Layout/Layout';
import Movies from '../features/Movies/Movies';
import { Home } from '../features/Home/Home';
import './App.css';
import MovieDetails from '../features/MovieDetails/MovieDetails';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/movies/:id' element={ <MovieDetails /> } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

