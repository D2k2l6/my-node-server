const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const fileHandler = require('./fileHandler');

// Initialize the data file
fileHandler.initializeDataFile();

// Helper function to parse JSON body
const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Create the server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Set headers
    res.setHeader('Content-Type', 'application/json');

    // Serve API documentation on the root path
    if (path === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        const htmlFilePath = path.join(__dirname, 'api-doc.html');
        fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('<h1>Internal Server Error</h1>');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else if (path === '/movies') {
        const data = fileHandler.readData();

        if (method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ movies: data.movies }));
        } else if (method === 'POST') {
            try {
                const newMovie = await parseRequestBody(req);
                newMovie.id = Date.now();
                data.movies.push(newMovie);
                fileHandler.writeData(data);
                res.writeHead(201);
                res.end(JSON.stringify({ movies: data.movies }));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            }
        } else {
            res.writeHead(405);
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
    } else if (path.startsWith('/movies/') && method === 'PUT') {
        const id = parseInt(path.split('/')[2]);
        const data = fileHandler.readData();
        const index = data.movies.findIndex(movie => movie.id === id);

        if (index !== -1) {
            try {
                const updatedMovie = await parseRequestBody(req);
                data.movies[index] = { ...data.movies[index], ...updatedMovie };
                fileHandler.writeData(data);
                res.writeHead(200);
                res.end(JSON.stringify({ movies: data.movies }));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            }
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Movie not found' }));
        }
    } else if (path.startsWith('/movies/') && method === 'DELETE') {
        const id = parseInt(path.split('/')[2]);
        const data = fileHandler.readData();
        const filteredMovies = data.movies.filter(movie => movie.id !== id);

        if (filteredMovies.length !== data.movies.length) {
            data.movies = filteredMovies;
            fileHandler.writeData(data);
            res.writeHead(200);
            res.end(JSON.stringify({ movies: data.movies }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Movie not found' }));
        }
    } else {
        // Handle non-existent paths
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});