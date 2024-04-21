import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "errorhandler";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import usersRoutes from "./routes/users.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";

// Load env variables
dotenv.config({ path: ['.env.local'] });

// Create session store
const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({ uri: process.env.MONGO_URI });

// Create express app
const app = express();

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.static('uploads'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    store,
    resave: false,
    saveUninitialized: false
}));

// Use routes
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);

// Use error handler after using routes
app.use(errorHandler({ log: false }));

// Make database connection
await mongoose.connect(process.env.MONGO_URI);

// Listen for incoming requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Express app is running on port ${port}!`);
});