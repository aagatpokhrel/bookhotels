import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const register = (pool) => async (req, res) => {
    const { name, email, username, password } = req.body;
    const id = uuidv4(); // generate unique id
  
    // check if user already exists
    pool.query(`SELECT * FROM users WHERE username = ?`, [username], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server error');
      }
      if (results && results.length > 0) {
        res.status(400).send('User already exists');
      } else {
        // hash password and save user data to database
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            res.status(500).send('Server error');
          } else {
            pool.query(`INSERT INTO users (id, name, email, username, password) VALUES (?, ?, ?, ?, ?)`, [id, name, email, username, hash], (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).send('Server error');
              } else {
                res.status(201).json({ message: 'User registered successfully', id });
              }
            });
          }
        });
      }
    });
};
  

// Login with username and password
export const login = (pool) => (req, res) => {
    try {
        const { username, password } = req.body;
        const query = `SELECT * FROM users WHERE username = ?`;
        pool.query(query, [username], async (error, results, fields) => {
            if (error) throw error;
            if (results.length === 0) {
                res.status(401).send('Invalid username or password');
            } else {
                const user = results[0];
                const passwordMatches = await bcrypt.compare(password, user.password);
                if (passwordMatches) {
                    const token = jwt.sign({ userId: user.id }, 'secret');
                    res.send({ token });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};