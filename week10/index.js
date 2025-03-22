import http from 'http';
import fs from 'fs';

const PORT = process.env.PORT || 3000; // Use environment variable PORT or default to 3000
const HOME_PAGE = 'home.html'; // Path to your home.html file

http.createServer((req, res) => {
    const path = req.url.toLowerCase(); // Convert the requested URL to lowercase for case-insensitive routing

    switch (path) {
        case '/':
            // Serve the home page
            fs.readFile(HOME_PAGE, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.error('File not found:', HOME_PAGE);
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Home page not found');
                    } else {
                        console.error('Error reading file:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    }
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data.toString());
            });
            break;

        case '/about':
            // Serve the about page
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About page: This is a simple Node.js server created for learning purposes.');
            break;

        default:
            // Handle 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not Found');
            break;
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
