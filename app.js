import express from "express";
import { sequelize } from './models/index.js';

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection successful');

    // Sync database with models
    await sequelize.sync({ alter: false }); // Disable alter to prevent automatic schema changes
    console.log('Database synced successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
