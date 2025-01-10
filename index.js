import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes)
app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
})