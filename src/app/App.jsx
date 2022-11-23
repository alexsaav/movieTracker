import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Movies from '../features/Movies/Movies';
import { Home } from '../components/Home/Home';
import './App.css';
import MovieDetails from '../features/MovieDetails/MovieDetails';
import MovieCredits from '../features/MovieCredits/MovieCredits';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/movie/:id' element={ <MovieDetails /> } />
                    <Route path='movie/:id/cast' element={ <MovieCredits /> } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

