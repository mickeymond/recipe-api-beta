import { Router } from "express";
import multer from "multer";
import { addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from "../controllers/recipes.controller.js";

// Create multer upload middleware
const upload = multer({ dest: 'uploads/images' });

// Create recipes router
const router = Router();

// Define routes
router.post('/', upload.single('image'), addRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipe);

router.patch('/:id', updateRecipe);

router.delete('/:id', deleteRecipe);

// Export router
export default router;