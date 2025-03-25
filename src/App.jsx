import { useState, useEffect } from 'react';
import { Grid, Pagination, Box, TextField, MenuItem } from '@mui/material';
import MovieCard from './MovieCard';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
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

  useEffect(() => {
    const fetchSortedMovies = async () => {
      if (sortCriteria) {
        try {
          const res = await axios.get(`http://localhost:3000/api/movies/sorted?criteria=${sortCriteria}`, {
            headers: {
              authtoken: localStorage.getItem('auth_token'),
            },
          });
          setMovies(res.data.getMovies);
        } catch (error) {
          console.error('Error sorting movies:', error);
        }
      }
    };

    fetchSortedMovies();
  }, [sortCriteria]);

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (searchQuery) {
        try {
          const res = await axios.get(`http://localhost:3000/api/movies/search?searchquery=${searchQuery}`, {
            headers: {
              authtoken: localStorage.getItem('auth_token'),
            },
          });
          setMovies(res.data);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      }
    };

    fetchSearchedMovies();
  }, [searchQuery]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const paginatedMovies = movies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
        />
        <TextField
          select
          label="Sort By"
          value={sortCriteria}
          onChange={handleSortChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </TextField>
      </Box>

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
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default App;
