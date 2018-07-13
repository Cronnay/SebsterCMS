import express from 'express';
const router = express.Router();

router.get('/:pagename', (req, res) => {
	res.send(req.params.pagename);
});

export { router }