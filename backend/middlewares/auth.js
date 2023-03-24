import jwt from 'jsonwebtoken';
import {pool} from '../db.js'

// Middleware to authenticate user with JWT token
export function authenticateUser(req, res,  next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('Missing authorization header');
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret');
        const userId = decoded.userId;
        const query = `SELECT * FROM users WHERE id = ?`;
        pool.query(query, [userId], (error, results, fields) => {
            if (error) throw error;
            if (results.length === 0) {
                res.status(401).send('Invalid user');
            } else {
                req.user = results[0];
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid token');
    }
}