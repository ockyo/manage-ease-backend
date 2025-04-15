const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes')

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/images', imageRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));