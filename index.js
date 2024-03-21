import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipesRoutes from "./routes/recipes.routes.js";

// Load env variables
dotenv.config({ path: ['.env.local'] });

// Create express app
const app = express();

// Use routes
app.use('/recipes', recipesRoutes);

// Make database connection
await mongoose.connect(process.env.MONGO_URI);

// Listen for incoming requests
app.listen(6000, () => {
    console.log('Express app is running!');
});