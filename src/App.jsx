import { useState, useEffect } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import MovieCard from './MovieCard';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/movies', {
          headers: {
            authtoken: localStorage.getItem('auth_token'),
          },
        });
        setMovies(res.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedMovies = movies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {paginatedMovies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(movies.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
export default App;
