import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Movies from '../features/Movies/Movies';
import { Home } from '../components/Home/Home';
import './App.css';
import Movie from '../features/Movie/Movie';
import MovieCredits from '../features/MovieCredits/MovieCredits';
import PersonDetails from '../features/People/PersonDetails';
import Images from '../features/MovieMedia/Images';
import Videos from '../features/MovieMedia/Videos';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/movie/:id' element={ <Movie /> } />
                    <Route path='movie/:id/cast' element={ <MovieCredits /> } />
                    <Route path='person/:id-name' element={ <PersonDetails /> } />
                    <Route path='movie/:id/images' element={ <Images /> } />
                    <Route path='movie/:title/:id/videos' element={ <Videos /> } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

