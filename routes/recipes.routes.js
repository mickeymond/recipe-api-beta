import { Router } from "express";
import dotenv from "dotenv";
import multer from "multer";
import { Client as MinioClient } from "minio";
import { MinioStorageEngine } from "@namatery/multer-minio";
import { addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from "../controllers/recipes.controller.js";
import { checkUserSession } from "../middlewares/auth.middleware.js";

// Load env variables
dotenv.config({ path: ['.env.local'] });

// Create minio client
const minioClient = new MinioClient({
    endPoint: 'play.min.io',
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

// Create multer upload middleware
// const upload = multer({ dest: 'uploads/images' });
const upload = multer({
    storage: new MinioStorageEngine(minioClient, 'recipe-api', {
        path: 'images'
    }),
    preservePath: true
});

// Create recipes router
const router = Router();

// Apply middlewares
router.use(checkUserSession);

// Define routes
router.post('/', upload.single('image'), addRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipe);

router.patch('/:id', updateRecipe);

router.delete('/:id', deleteRecipe);

// Export router
export default router;