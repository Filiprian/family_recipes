require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const multer = require("multer")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype)
        if (extname && mimetype) {
            cb(null, true)
        } else {
            cb(new Error("Only JPEG, JPG or PNG images"))
        }
    },
    limits: {fileSize: 8*1024*1024} // 8MB limit
})

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    next();
});

// Test database connection on startup
pool.getConnection()
    .then(conn => {
        console.log('Database connected successfully');
        conn.release();
    })
    .catch(err => {
        console.error('Database connection failed');
    });

// GET all recipes
app.get("/api/recipes", async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recipes ORDER BY id DESC');
        console.log('Query successful');
        res.json(rows);
    } catch (e) {
        console.error('Error in GET all');
        next(e);
    }
});

// GET one recipe
app.get("/api/recipes/:id", async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({message: "Not found"});
        res.json(rows[0]);
        console.log('Query successful');
    } catch (e) {
        console.error('Error in GET one');
        next(e);
    }
});

// ADD recipe
app.post("/api/recipes", upload.single('image'), async (req, res, next) => {
    try {
        const {name, tag, ingredients, process, minutes, portions} = req.body;
        if (!name || !tag || !ingredients || !process) {
            return res.status(400).json({message: "Missing required fields"});
        }
        const imagePath = req.file ? `uploads/${req.file.filename}` : null
        const [result] = await pool.execute(
            'INSERT INTO recipes (name, tag, ingredients, process, minutes, portions, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, tag, ingredients, process, minutes, portions, imagePath]
        );
        const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error in POST');
        next(e);
    }
});

// DELETE recipe
app.delete("/api/recipes/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"})
        }
        const [rows] = await pool.query('SELECT image FROM recipes WHERE id = ?', [id])
        if (!rows.length) {
            return res.status(404).json({ message: "Not found" });
        }
        if (rows[0].image) {
            const fs = require("fs").promises;
            const imagePath = path.join(__dirname, 'public', rows[0].image);
            await fs.unlink(imagePath).catch((err) => console.error('Failed to delete image:', err));
        }
        const [result] = await pool.execute('DELETE FROM recipes WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({message: "Not found"});
        res.json({message: "Deleted"});
    } catch (e) {
        console.error('Error in DELETE');
        next(e);
    }
});

// Handeling errors
app.use((e, req, res, next) => {
    res.status(500).json({message: "Server failed"});
});

// Starts server
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server listening")
}); 