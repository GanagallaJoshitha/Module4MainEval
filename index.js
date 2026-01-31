const express = require('express');
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const tripRoutes = require('./routes/trip.routes');
const logger = require('./middleware/logger');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(logger);
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);
app.use((req, res) => 
  res.status(404).json({ message: 'This Request is not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`));