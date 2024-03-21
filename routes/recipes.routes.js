import { Router } from "express";

const router = Router();

// Define routes
router.post('/', (req, res) => {
    res.send('Add recipe');
});

router.get('/', (req, res) => {
    res.send('Get all recipes');
});

router.get('/:id', (req, res) => {
    res.send(`Get recipe with id: ${req.params.id}`);
});

router.patch('/:id', (req, res) => {
    res.send(`Update recipe with id: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete recipe with id: ${req.params.id}`);
});

// Export router
export default router;