import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.send("testing");
});

router.post('/register', (req, res) => {
	res.send("hello");
});

export { router }