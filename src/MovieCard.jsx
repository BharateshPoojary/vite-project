import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MovieCard({ movie }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                sx={{ height: 440, objectFit: 'cover' }}
                image={movie.posterPath}
                title={movie.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                    {movie.overview}
                </Typography>
                <Typography variant="body2">
                    <strong>Rating:</strong> {movie.rating}
                </Typography>
                <Typography variant="body2">
                    <strong>Popularity:</strong> {movie.popularity}
                </Typography>
                <Typography variant="body2">
                    <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
            </CardContent>

        </Card>
    );
}
