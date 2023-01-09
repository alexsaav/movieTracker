import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Movies from '../features/Movies/Movies';
import Home from '../features/Home/Home'
import Movie from '../features/Movie/Movie';
import MovieCredits from '../features/MovieCredits/MovieCredits';
import Person from '../features/People/Person';
import Images from '../features/MovieMedia/Images';
import Videos from '../features/MovieMedia/Videos';
import PersonImages from '../features/People/PersonImages';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/search' element={<Movies />} />
                    <Route path='/movie/:id' element={ <Movie /> } />
                    <Route path='movie/:id/cast' element={ <MovieCredits /> } />
                    <Route path='/person/:id/:name' element={ <Person /> } />
                    <Route path='movie/:id/images' element={ <Images /> } />
                    <Route path='movie/:title/:id/videos' element={ <Videos /> } />
                    <Route path='/photos/:id/:name' element={ <PersonImages /> } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

