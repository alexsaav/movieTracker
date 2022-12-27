import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchMovies, searchMovies } from './moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCard';
import PaginationComponent from '../../components/Pagination/Pagination';
import Typography from '@mui/material/Typography';

const Images = () => {
  return (
    <div>Images</div>
  )
}

export default Images