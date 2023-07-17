import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import SearchResults from '../features/Movies/SearchResults';
import Home from '../components/Home/Home'
import Movie from '../features/Movie/Movie';
import MovieCredits from '../features/MovieCredits/MovieCredits';
import Person from '../features/Person/Person';
import Images from '../features/Movie/MovieMedia/MovieImages'
import Videos from '../features/Movie/MovieMedia/Videos';
import PersonImages from '../features/Person/Images/PersonImages';
import PopularMovies from '../features/Movies/Popular/PopularMovies';
import UpcomingMovies from '../features/Movies/Upcoming/UpcomingMovies';
import TopRatedMovies from '../features/Movies/TopRated/TopRatedMovies';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import PopularPeople from '../features/People/PopularPeople';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/search' element={<SearchResults />} />
                    <Route path='/movie/:id' element={ <Movie /> } />
                    <Route path='movie/:id/cast' element={ <MovieCredits /> } />
                    <Route path='/person/:id/:name' element={ <Person /> } />
                    <Route path='movie/:id/images' element={ <Images /> } />
                    <Route path='movie/:title/:id/videos' element={ <Videos /> } />
                    <Route path='/photos/:id/:name' element={ <PersonImages /> } />
                    <Route path='/movies/popular' element={ <PopularMovies /> } />
                    <Route path='/movies/upcoming' element={ <UpcomingMovies /> } />
                    <Route path='/movies/top-rated' element={ <TopRatedMovies /> }/> 
                    <Route path='/popular-people' element={ <PopularPeople /> } />
                    <Route path='/page-not-found' element={ <PageNotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

