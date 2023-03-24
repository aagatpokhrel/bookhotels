

export const book = (pool) => async (req, res) => {
    const { hotelId, userId, startDate, endDate } = req.body;
    const query = `INSERT INTO reservations (hotel_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)`;
    pool.query(query, [hotelId, userId, startDate, endDate], (error, results, fields) => {
        if (error) throw error;
        res.send('Room booked successfully');
    });
};