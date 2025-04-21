const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
const data = {
    movies: [
        { id: 1, title: "Inception", director: "Christopher Nolan", releaseYear: 2010, genres: ["Sci-Fi", "Action"] },
        { id: 2, title: "The Matrix", director: "The Wachowskis", releaseYear: 1999, genres: ["Sci-Fi", "Action"] }
    ],
    series: [
        { id: 1, title: "Breaking Bad", creator: "Vince Gilligan", seasons: 5, genres: ["Crime", "Drama"] },
        { id: 2, title: "Stranger Things", creator: "The Duffer Brothers", seasons: 4, genres: ["Sci-Fi", "Horror"] }
    ],
    songs: [
        { id: 1, title: "Bohemian Rhapsody", artist: "Queen", releaseYear: 1975, album: "A Night at the Opera" },
        { id: 2, title: "Blinding Lights", artist: "The Weeknd", releaseYear: 2019, album: "After Hours" }
    ]
};

// Helper function to find and update arrays
const findAndUpdate = (array, id, newData) => {
    const index = array.findIndex(item => item.id === id);
    if (index !== -1) {
        array[index] = { ...array[index], ...newData };
        return array;
    }
    return null;
};

// Movies routes
app.get('/movies', (req, res) => {
    res.json({ movies: data.movies });
});

app.post('/movies', (req, res) => {
    const newMovie = { id: Date.now(), ...req.body };
    data.movies.push(newMovie);
    res.json({ movies: data.movies });
});

app.put('/movies/:id', (req, res) => {
    const updatedMovies = findAndUpdate(data.movies, parseInt(req.params.id), req.body);
    if (updatedMovies) {
        res.json({ movies: updatedMovies });
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
});

app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data.movies = data.movies.filter(movie => movie.id !== id);
    res.json({ movies: data.movies });
});

// Series routes
app.get('/series', (req, res) => {
    res.json({ series: data.series });
});

app.post('/series', (req, res) => {
    const newSeries = { id: Date.now(), ...req.body };
    data.series.push(newSeries);
    res.json({ series: data.series });
});

app.put('/series/:id', (req, res) => {
    const updatedSeries = findAndUpdate(data.series, parseInt(req.params.id), req.body);
    if (updatedSeries) {
        res.json({ series: updatedSeries });
    } else {
        res.status(404).json({ error: "Series not found" });
    }
});

app.delete('/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data.series = data.series.filter(series => series.id !== id);
    res.json({ series: data.series });
});

// Songs routes
app.get('/songs', (req, res) => {
    res.json({ songs: data.songs });
});

app.post('/songs', (req, res) => {
    const newSong = { id: Date.now(), ...req.body };
    data.songs.push(newSong);
    res.json({ songs: data.songs });
});

app.put('/songs/:id', (req, res) => {
    const updatedSongs = findAndUpdate(data.songs, parseInt(req.params.id), req.body);
    if (updatedSongs) {
        res.json({ songs: updatedSongs });
    } else {
        res.status(404).json({ error: "Song not found" });
    }
});

app.delete('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data.songs = data.songs.filter(song => song.id !== id);
    res.json({ songs: data.songs });
});

// 404 for any other route
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});