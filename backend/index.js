import express from 'express';
import cors from 'cors';

import { authenticateUser } from './middlewares/auth.js';
import {login, register} from './controllers/user.js';
import { search } from './controllers/search.js';
import { book } from './controllers/book.js';
import {pool} from './db.js';

const app = express();

app.use(cors())
app.use(express.json())    // allows to accept json in the body of a request
app.use(express.urlencoded({extended: true}))

const port = 5000;



app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Login & Register
app.post('/register', register(pool));
app.post('/login', login(pool));

// Search for hotels based on criteria
app.post('/hotels', authenticateUser, search(pool));
// Book a hotel room
app.post('/book', authenticateUser, book(pool));

// Start the server
app.listen(port, () => {
    console.log(`Hotel booking system listening at http://localhost:${port}`);
});
