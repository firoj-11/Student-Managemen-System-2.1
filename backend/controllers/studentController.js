const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.getStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createStudent = async (req, res) => {
    try {
        const id = uuidv4();
        const { name, email, phone, gender, department, semester, enroll_date, status, avatar } = req.body;
        const sql = `INSERT INTO students (id, name, email, phone, gender, department, semester, enroll_date, status, avatar) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        await pool.query(sql, [id, name, email, phone, gender, department, semester, enroll_date, status, avatar]);
        res.status(201).json({ id, ...req.body });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, gender, department, semester, enroll_date, status } = req.body;
        const sql = `UPDATE students SET name=?, email=?, phone=?, gender=?, department=?, semester=?, enroll_date=?, status=? WHERE id=?`;
        await pool.query(sql, [name, email, phone, gender, department, semester, enroll_date, status, id]);
        res.json({ message: 'Updated' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteStudent = async (req, res) => {
    try {
        await pool.query('DELETE FROM students WHERE id=?', [req.params.id]);
        res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};