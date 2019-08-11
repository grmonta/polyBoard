const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/it', require('./routes/api/it'));
app.use('/api/maintenance', require('./routes/api/maintenance'));
app.use('/api/news', require('./routes/api/news'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/stock', require('./routes/api/stock'));
app.use('/api/supplies', require('./routes/api/supplies'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
