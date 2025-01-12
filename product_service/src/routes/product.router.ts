import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({
		success: true,
		products: [],
	});
});

export default router;
