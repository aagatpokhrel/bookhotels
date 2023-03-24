
export const search = (pool) => async (req, res) => {
    const { availability, address, price, room_type } = req.body;
    let query = `SELECT h.*, r.room_id FROM hotels h
               JOIN rooms r ON h.hotel_id = r.hotel_id
               WHERE 1=1`;
    if (availability) query += ` AND r.availability = ?`;
    if (address) query += ` AND h.address = ?`;
    if (price) query += ` AND r.price <= ?`;
    if (room_type) query += ` AND r.room_type = ?`;
    const queryParams = [availability, address, price, room_type].filter(param => param !== undefined);
    pool.query(query, queryParams, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
};